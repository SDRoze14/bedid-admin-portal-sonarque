const Mongoose = require("mongoose");

const UserTokenSchema = new Mongoose.Schema(
  {
    token: {
      token: {
        type: String,
        required: true,
        index: true
      },
      refresh_token: {
        type: String,
        required: true,
        index: true
      },
      expires_in: {
        type: Date
      }
    },
    user: Mongoose.Schema.Types.Mixed,
    agent: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = Mongoose.model("user_tokens", UserTokenSchema);
