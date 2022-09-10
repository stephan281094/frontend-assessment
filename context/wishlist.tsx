import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

// Possible actions
type ClearAction = {
  type: "clear";
};
type SetAction = {
  type: "set";
  payload: Record<number, number>;
};
type ToggleAction = {
  type: "toggle";
  payload: number;
};
type UpdateAction = {
  type: "update";
  payload: {
    id: number;
    quantity: number;
  };
};

export type Action = ClearAction | SetAction | ToggleAction | UpdateAction;
export type Dispatch = (action: Action) => void;
export type State = Record<number, number>;

const WishlistContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function wishlistReducer(state: State, action: Action) {
  switch (action.type) {
    case "clear": {
      return {};
    }
    case "set": {
      return action.payload;
    }
    case "toggle": {
      if (state[action.payload]) {
        const { [action.payload]: unused, ...rest } = state;
        return rest;
      }

      return {
        ...state,
        [action.payload]: 1,
      };
    }
    case "update": {
      return {
        ...state,
        [action.payload.id]: action.payload.quantity,
      };
    }
  }
}

function WishlistProvider({ children }: { children: React.ReactNode }) {
  const firstUpdate = useRef(true);
  const [state, dispatch] = useReducer(wishlistReducer, {});
  const value = { state, dispatch };

  useEffect(() => {
    dispatch({
      type: "set",
      payload: JSON.parse(window.localStorage.getItem("wishlist") || "{}"),
    });
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    window.localStorage.setItem("wishlist", JSON.stringify(state));
  }, [state]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  const context = useContext(WishlistContext);

  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
}

export { WishlistProvider, useWishlist };
