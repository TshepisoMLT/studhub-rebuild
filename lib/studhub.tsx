import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  addPost,
  addReply,
  createStudent,
  seedBoard,
  toggleJoin,
  validateStudent,
  type Board,
  type Student,
} from "@/lib/board-logic";

const sessionKey = "studhub.session.v1";
const boardKey = "studhub.board.v1";

type StudHubContextValue = {
  ready: boolean;
  user: Student | null;
  board: Board;
  signIn: (input: { name: string; email: string }) => string | null;
  signUp: (input: { name: string; email: string; course: string }) => string | null;
  signOut: () => void;
  toggleJoin: (communityId: string) => void;
  addPost: (communityId: string, body: string) => string | null;
  addReply: (postId: string, body: string) => string | null;
};

const StudHubContext = createContext<StudHubContextValue | null>(null);

function isStudent(value: unknown): value is Student {
  if (!value || typeof value !== "object") return false;
  const student = value as Partial<Student>;
  return (
    typeof student.id === "string" &&
    typeof student.name === "string" &&
    typeof student.email === "string" &&
    typeof student.course === "string"
  );
}

function isBoard(value: unknown): value is Board {
  if (!value || typeof value !== "object") return false;
  const board = value as Partial<Board>;
  return Array.isArray(board.communities) && Array.isArray(board.posts) && Array.isArray(board.replies);
}

export function StudHubProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<Student | null>(null);
  const [board, setBoard] = useState<Board>(seedBoard());

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [storedUser, storedBoard] = await Promise.all([
          AsyncStorage.getItem(sessionKey),
          AsyncStorage.getItem(boardKey),
        ]);
        if (cancelled) return;
        if (storedUser) {
          const parsed: unknown = JSON.parse(storedUser);
          if (isStudent(parsed)) setUser(parsed);
        }
        if (storedBoard) {
          const parsed: unknown = JSON.parse(storedBoard);
          if (isBoard(parsed)) setBoard(parsed);
        }
      } catch {
        // A bad cache should not block the first launch.
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistUser = useCallback((next: Student | null) => {
    setUser(next);
    if (next) {
      void AsyncStorage.setItem(sessionKey, JSON.stringify(next));
    } else {
      void AsyncStorage.removeItem(sessionKey);
    }
  }, []);

  const persistBoard = useCallback((next: Board) => {
    setBoard(next);
    void AsyncStorage.setItem(boardKey, JSON.stringify(next));
  }, []);

  const signIn = useCallback(
    (input: { name: string; email: string }) => {
      const error = validateStudent(input, false);
      if (error) return error;
      persistUser(createStudent(input));
      return null;
    },
    [persistUser],
  );

  const signUp = useCallback(
    (input: { name: string; email: string; course: string }) => {
      const error = validateStudent(input, true);
      if (error) return error;
      persistUser(createStudent(input));
      return null;
    },
    [persistUser],
  );

  const signOut = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const join = useCallback(
    (communityId: string) => {
      persistBoard(toggleJoin(board, communityId));
    },
    [board, persistBoard],
  );

  const createPost = useCallback(
    (communityId: string, body: string) => {
      if (!user) return "Sign in on this phone first.";
      const result = addPost(board, { communityId, authorName: user.name, body });
      if (result.error || !result.board) return result.error;
      persistBoard(result.board);
      return null;
    },
    [board, persistBoard, user],
  );

  const createReply = useCallback(
    (postId: string, body: string) => {
      if (!user) return "Sign in on this phone first.";
      const result = addReply(board, { postId, authorName: user.name, body });
      if (result.error) return result.error;
      persistBoard(result.board);
      return null;
    },
    [board, persistBoard, user],
  );

  const value = useMemo<StudHubContextValue>(
    () => ({
      ready,
      user,
      board,
      signIn,
      signUp,
      signOut,
      toggleJoin: join,
      addPost: createPost,
      addReply: createReply,
    }),
    [ready, user, board, signIn, signUp, signOut, join, createPost, createReply],
  );

  return <StudHubContext.Provider value={value}>{children}</StudHubContext.Provider>;
}

export function useStudHub(): StudHubContextValue {
  const value = useContext(StudHubContext);
  if (!value) throw new Error("useStudHub must be used inside StudHubProvider");
  return value;
}
