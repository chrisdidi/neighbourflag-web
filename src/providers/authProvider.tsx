import React, { createContext, useContext, useEffect, useState } from "react";
import { MeData, User } from "../types/auth.types";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router-dom";

interface IProps {
  user?: User;
  signOut: () => any;
  setUser: (user?: User) => any;
  userLoading: boolean;
  verifyJwt: () => any;
}

const GET_ME = gql`
  {
    me {
      id
      name
      email
      emailVerified
      createdAt
      profile_picture
      contact_no
      role
      active
      authType
    }
  }
`;

const GET_ME_SUBSCRIPTION = gql`
  subscription {
    meUpdates {
      id
      name
      email
      emailVerified
      createdAt
      profile_picture
      contact_no
      role
      active
      authType
    }
  }
`;

const authContext = createContext<IProps>({
  user: undefined,
  signOut: () => {},
  setUser: (user?: User) => {},
  verifyJwt: () => {},
  userLoading: true,
});

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const history = useHistory();
  const [user, setUser] = useState<User | undefined>();
  const authToken = useReactiveVar(authTokenVar);
  const { data, loading, refetch, subscribeToMore } = useQuery<MeData>(GET_ME, {
    skip: !Boolean(authToken),
  });
  const signOut = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    setUser(undefined);
    history.push("/");
    isLoggedInVar(false);
    authTokenVar(undefined);
  };

  const verifyJwt = () => {
    if (authToken) {
      refetch();
    } else {
      setUser(undefined);
    }
  };

  useEffect(() => {
    if (user && data?.me && authToken) {
      subscribeToMore({
        document: GET_ME_SUBSCRIPTION,
        context: {
          connectionParams: {
            "x-jwt": authToken,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: {
            subscriptionData: {
              data: {
                meUpdates: User;
              };
            };
          }
        ) => {
          if (!data) return prev;
          return {
            me: {
              ...data.meUpdates,
            },
          };
        },
      });
    }
  }, [data?.me, subscribeToMore, authToken, user]);

  useEffect(() => {
    if (authToken && !loading) {
      if (data?.me?.id) {
        localStorage.setItem(LOCALSTORAGE_TOKEN, authToken);
        setUser(data.me);
      }
    } else {
      setUser(undefined);
    }
  }, [authToken, data?.me, loading]);
  return {
    user,
    signOut,
    setUser,
    verifyJwt,
    userLoading: loading,
  };
};
