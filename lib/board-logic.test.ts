import assert from "node:assert/strict";
import test from "node:test";

import {
  addPost,
  addReply,
  formatWhen,
  seedBoard,
  toggleJoin,
  validateStudent,
} from "./board-logic.ts";

test("validateStudent rejects a missing name and a bad email", () => {
  assert.equal(validateStudent({ name: "A", email: "a@b.co" }, false), "Enter your name.");
  assert.equal(validateStudent({ name: "Amahle", email: "not-an-email" }, false), "Enter a valid email.");
  assert.equal(validateStudent({ name: "Amahle", email: "amahle@student.ac.za" }, false), null);
  assert.equal(
    validateStudent({ name: "Amahle", email: "amahle@student.ac.za", course: "" }, true),
    "Enter a course or topic.",
  );
});

test("posts stay inside joined communities and replies attach to a post", () => {
  const now = Date.parse("2026-11-09T00:00:00.000Z");
  let board = seedBoard(now);
  const blocked = addPost(board, {
    communityId: "mat151",
    authorName: "Amahle",
    body: "Can I post here before joining?",
    now,
  });
  assert.equal(blocked.error, "Join that community before posting.");

  board = toggleJoin(board, "mat151");
  const created = addPost(board, {
    communityId: "mat151",
    authorName: "Amahle",
    body: "Which table do we use for question 2?",
    now,
  });
  assert.equal(created.error, null);
  assert.equal(created.board.posts[0]?.communityId, "mat151");

  const replied = addReply(created.board, {
    postId: created.postId ?? "",
    authorName: "Thabo",
    body: "The front of the formula sheet.",
    now,
  });
  assert.equal(replied.error, null);
  assert.equal(replied.board.replies.at(-1)?.postId, created.postId);
});

test("formatWhen uses short relative labels", () => {
  const now = Date.parse("2026-11-09T12:00:00.000Z");
  assert.equal(formatWhen(new Date(now - 30 * 1000).toISOString(), now), "Just now");
  assert.equal(formatWhen(new Date(now - 10 * 60 * 1000).toISOString(), now), "10m ago");
  assert.equal(formatWhen(new Date(now - 2 * 60 * 60 * 1000).toISOString(), now), "2h ago");
});
