export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
};

export type Community = {
  id: string;
  name: string;
  course: string;
  blurb: string;
  members: number;
  joined: boolean;
};

export type Post = {
  id: string;
  communityId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type Reply = {
  id: string;
  postId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type Board = {
  communities: Community[];
  posts: Post[];
  replies: Reply[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStudent(
  input: { name: string; email: string; course?: string },
  requireCourse: boolean,
): string | null {
  const name = input.name.trim();
  const email = input.email.trim();
  const course = (input.course ?? "").trim();

  if (name.length < 2) return "Enter your name.";
  if (!emailPattern.test(email)) return "Enter a valid email.";
  if (requireCourse && course.length < 2) return "Enter a course or topic.";
  return null;
}

export function createStudent(input: {
  name: string;
  email: string;
  course?: string;
}): Student {
  const course = input.course?.trim();
  return {
    id: `student_${Date.now()}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    course: course && course.length > 0 ? course : "Not set",
  };
}

export function seedBoard(now = Date.now()): Board {
  return {
    communities: [
      {
        id: "cos301",
        name: "COS301",
        course: "Software Engineering",
        blurb: "Project teams, demos, and questions for the module.",
        members: 128,
        joined: true,
      },
      {
        id: "mat151",
        name: "MAT151",
        course: "Calculus",
        blurb: "Problem sets and step-by-step explanations.",
        members: 86,
        joined: false,
      },
      {
        id: "exam-week",
        name: "Exam week",
        course: "Campus",
        blurb: "A short-lived room for this term's revision.",
        members: 54,
        joined: false,
      },
    ],
    posts: [
      {
        id: "p1",
        communityId: "cos301",
        authorName: "Amahle",
        body: "Can someone review a use-case diagram before tomorrow's demo? Text or a link is enough.",
        createdAt: new Date(now - 60 * 60 * 1000).toISOString(),
      },
      {
        id: "p2",
        communityId: "mat151",
        authorName: "Thabo",
        body: "Stuck on integration by parts, question 4. I can share my working if someone checks the last step.",
        createdAt: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
    replies: [
      {
        id: "r1",
        postId: "p1",
        authorName: "Lerato",
        body: "I can look after 6. Drop the diagram here as a description for now.",
        createdAt: new Date(now - 30 * 60 * 1000).toISOString(),
      },
    ],
  };
}

export function toggleJoin(board: Board, communityId: string): Board {
  return {
    ...board,
    communities: board.communities.map((community) => {
      if (community.id !== communityId) return community;
      const joined = !community.joined;
      return {
        ...community,
        joined,
        members: Math.max(0, community.members + (joined ? 1 : -1)),
      };
    }),
  };
}

export function addPost(
  board: Board,
  input: { communityId: string; authorName: string; body: string; now?: number },
): { board: Board; error: string | null; postId: string | null } {
  const body = input.body.trim();
  const community = board.communities.find((item) => item.id === input.communityId);
  if (!community) return { board, error: "Pick a community first.", postId: null };
  if (!community.joined) return { board, error: "Join that community before posting.", postId: null };
  if (body.length < 2) return { board, error: "Write a question or note first.", postId: null };

  const postId = `post_${input.now ?? Date.now()}`;
  const post: Post = {
    id: postId,
    communityId: community.id,
    authorName: input.authorName,
    body,
    createdAt: new Date(input.now ?? Date.now()).toISOString(),
  };
  return { board: { ...board, posts: [post, ...board.posts] }, error: null, postId };
}

export function addReply(
  board: Board,
  input: { postId: string; authorName: string; body: string; now?: number },
): { board: Board; error: string | null } {
  const body = input.body.trim();
  const post = board.posts.find((item) => item.id === input.postId);
  if (!post) return { board, error: "That post is no longer on this phone." };
  if (body.length < 2) return { board, error: "Write a reply first." };

  const reply: Reply = {
    id: `reply_${input.now ?? Date.now()}`,
    postId: post.id,
    authorName: input.authorName,
    body,
    createdAt: new Date(input.now ?? Date.now()).toISOString(),
  };
  return { board: { ...board, replies: [...board.replies, reply] }, error: null };
}

export function formatWhen(iso: string, now = Date.now()): string {
  const delta = Math.max(0, now - new Date(iso).getTime());
  const minutes = Math.floor(delta / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
