import { gql } from "apollo-boost";
import { useSubscription } from "@apollo/react-hooks";
import { User, UserLike } from "@ba/schema/src";
import { useEffect, Reducer, useReducer } from "react";

const loginSub = gql`
  subscription userLoggedIn {
    userLoggedIn {
      id
      name
    }
  }
`;

type TLoginSubData = { userLoggedIn: Pick<User, "id" | "name"> };

const likeSub = gql`
  subscription userLikedABeer {
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

type TLikeSubData = { userLikedABeer: UserLike };

enum ActionTypes {
  ADD_LOGGED_IN,
  ADD_USER_LIKE,
}

type Action = {
  type: ActionTypes;
  data: TLoginSubData | TLikeSubData;
};

type State = Array<TLoginSubData | TLikeSubData>;

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
  const { data: loginData } = useSubscription<TLoginSubData>(loginSub);
  const { data: likeData } = useSubscription<TLikeSubData>(likeSub);

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

  return { feed };
};
