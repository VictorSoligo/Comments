-- CreateTable
CREATE TABLE "replies_feedbacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "feedback_value" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "reply_id" TEXT NOT NULL,
    CONSTRAINT "replies_feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "replies_feedbacks_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "replies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
