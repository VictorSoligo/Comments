/*
  Warnings:

  - You are about to drop the `comments_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "comments_likes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "comments_feedbacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "feedback_value" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    CONSTRAINT "comments_feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_feedbacks_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
