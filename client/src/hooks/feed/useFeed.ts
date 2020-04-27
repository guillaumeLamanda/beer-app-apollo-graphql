import { gql } from "apollo-boost";
import { useSubscription } from "@apollo/react-hooks";
import { useEffect, Reducer, useReducer } from "react";
import { UserLoggedIn } from "./__generated__/UserLoggedIn";
import { UserLikedABeer } from "./__generated__/UserLikedABeer";

const loginSub = gql`
  subscription UserLoggedIn {
    userLoggedIn {
      id
      name
    }
  }
`;

const likeSub = gql`
  subscription UserLikedABeer {
    userLikedABeer {
      action
      user {
        id
        name
      }
      beer {
        id
        name
      }
    }
  }
`;

enum ActionTypes {
  ADD_LOGGED_IN,
  ADD_USER_LIKE,
}

type Action = {
  type: ActionTypes;
  data: UserLoggedIn | UserLikedABeer;
};

type State = Array<UserLoggedIn | UserLikedABeer>;

const reducer: Reducer<State, Action> = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGGED_IN: {
      return [...state, action.data];
    }
    default: {
      return state;
    }
  }
};

export const useFeed = () => {
  const [feed, dispatch] = useReducer(reducer, []);
  const { data: loginData, error: loginError } = useSubscription<UserLoggedIn>(
    loginSub
  );
  const { data: likeData, error: likeError } = useSubscription<UserLikedABeer>(
    likeSub
  );

  useEffect(() => {
    if (loginData?.userLoggedIn) {
      dispatch({
        type: ActionTypes.ADD_LOGGED_IN,
        data: loginData,
      });
    }
    if (likeData?.userLikedABeer) {
      dispatch({
        type: ActionTypes.ADD_LOGGED_IN,
        data: likeData,
      });
    }
  }, [likeData, loginData]);

  return { feed, errors: { loginError, likeError } };
};
