const notificationSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Notification = mongoose.model("Notification", notificationSchema);
