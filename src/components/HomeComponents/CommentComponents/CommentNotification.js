import { useState } from "react";

const CommentNotification = () => {
    const [showNotification, setShowNotification] = useState(false);

    return ( 
    <div className="new-comment-notification" onClick={() => setShowNotification(false)}>
        New Comment Added! Click to view.
    </div> 
  );
}
 
export default CommentNotification;