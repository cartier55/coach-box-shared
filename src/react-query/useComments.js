import { useMutation, useQuery, useQueryClient } from "react-query";
import { createComment, readComments, updateComment, deleteComment } from "../services/api_data";

export const useComments = (date) => {
    const queryKey = ['comments', date];
    const queryClient = useQueryClient();
  
    const readCommentsQuery = useQuery(
        queryKey,
        async () => {
            const data = await readComments(date);
            return data;
        },
        {
            refetchOnWindowFocus: true,
        }
    );

    const createCommentMutation = useMutation(createComment, {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKey);
        },
      });
      
      const deleteCommentMutation = useMutation(deleteComment, {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKey);
        },
      });

      const updateCommentMutation = useMutation(updateComment, {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKey);
        },
      });

    const addComment = async (commentData) => {
        try {
            await createCommentMutation.mutateAsync(commentData);
        } catch (error) {
            console.error('Adding comment failed:', error);
        }
    };
      
    const removeComment = async (commentId) => {
        try {
            await deleteCommentMutation.mutateAsync(commentId);
        } catch (error) {
            console.error('Deleting comment failed:', error);
        }
    };
    
    const editComment = async (id, updatedText) => {
        try {
            console.log('trying', id, updatedText)
        //   await updateCommentMutation.mutateAsync({ id, updatedText });
          await updateCommentMutation.mutateAsync({id, updatedText});
        } catch (error) {
          console.error('Updating comment failed:', error);
        }
    };
   
      

    return {
        comments: readCommentsQuery.data || [],
        addComment,
        removeComment,
        editComment,
        isFetchingComments: readCommentsQuery.isLoading,
        isAddingComment: createCommentMutation.isLoading,
        fetchCommentsError: readCommentsQuery.isError,
        addCommentError: createCommentMutation.isError,
        fetchCommentsErrorMsg: readCommentsQuery.error,
        addCommentErrorMsg: createCommentMutation.error,
    };
};
