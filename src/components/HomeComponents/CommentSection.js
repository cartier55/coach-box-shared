import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form } from 'react-bootstrap';
import '../../stylez/CommentSections.css';
import CommentCard from './CommentComponents/CommentCard';
import { useComments } from '../../react-query/useComments';
import { getISODate } from '../../functions/Helpers';
import { set } from 'date-fns';

const CoachCommentsSection = () => {
  const today = getISODate()
  const {
    comments,
    addComment,
    removeComment,
    editComment,
    isFetchingComments,
    isAddingComment,
    fetchCommentsError,
    addCommentError,
  } = useComments(today);

  const inputRef = React.useRef(null);
  const commentsRef = React.useRef(null);
  const [updateId, setUpdateId] = useState(null);
  const [updateText, setUpdateText] = useState("");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddOrUpdateComment = async () => {
    if (updateId) {
      console.log(`Got updateId: ${updateId}`);
      await editComment(updateId, { text: newComment });
      setUpdateId(null);
    } else {
      console.log(updateId)
      console.log(`Adding comment: ${newComment}`);
      await addComment({ text: newComment });
    }
    setNewComment('');
    setUpdateText('');
  };


  const recentComments = comments.slice(Math.max(comments.length - 3, 0)).map(comment => (
    <CommentCard key={comment.id} comment={comment} recent={true} />
));


  useEffect(() => {
    if (commentsRef.current) {
      const element = commentsRef.current;
      const isNearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
  
      // If near the bottom, auto-scroll. Else, show notification.
      if (isNearBottom) {
        element.scrollTop = element.scrollHeight;
        setShowNotification(false);  // Reset the notification if it was previously shown
      } else if (element.scrollTop === lastScrollTop) { // Only show notification if user hasn't scrolled after the last one
        setShowNotification(true);
      }
    }
  }, [comments, lastScrollTop]);
  
  

  const Notification = () => (
    <div 
      className="new-comment-notification" 
      onClick={() => {
        if (commentsRef.current) {
          commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
        }
        setShowNotification(false);
      }}
    >
      New Comment Added! Click to view.
    </div>
  );
  

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = commentsRef.current.scrollHeight - commentsRef.current.scrollTop === commentsRef.current.clientHeight;
      if (isBottom && showNotification) {
        setShowNotification(false);
      }
    };
  
    if (commentsRef.current) {
      commentsRef.current.addEventListener('scroll', handleScroll);
  
      return () => {
        if (commentsRef.current) {
          commentsRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
}, [showNotification]);


useEffect(() => {
  if (updateText) {
    setNewComment(updateText);
    inputRef.current.focus();
    setUpdateId(updateId);  // Also set the comment ID being edited
  }
}, [updateText, updateId]);  // Add updateId to the dependency array

  

  const commentsSection = (
    <div className={`coach-comments-section ${isOpen ? 'open' : ''}`}>
      {showNotification && <Notification />} {/* Add this line */}
      <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
      <h2>Coaching Tips</h2>
      <div className='comment-container'>
        <div className="comments" ref={commentsRef}>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} removeComment={removeComment} setUpdateText={setUpdateText} setUpdateId={setUpdateId} />
          ))}
        </div>
      </div>
      <Form.Group controlId="newComment">
        <Form.Control
          ref={inputRef}  // set the ref here
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a tip..."
        />
      </Form.Group>
      <Button onClick={handleAddOrUpdateComment} style={{backgroundColor:'#0B57A3'}}>
        {updateId ? 'Update Comment' : 'Add Comment'}
      </Button>    </div>
  );
  

 

  return (
    // div.comments-section-container
    // <div className="comments-section-container">
      <div className="recent-comments-container">
        <h3>Recent Tips</h3>
        {recentComments}
        {ReactDOM.createPortal(commentsSection, document.body)}
        <Button className="comments-button" onClick={() => setIsOpen(!isOpen)}>
          Comments
        </Button>
      </div>
  );
};

export default CoachCommentsSection;
