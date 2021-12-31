import React, { useState } from 'react';
// Querys
import { useQuery } from '@apollo/client';
import { GET_COMMENT_REPLIES } from '../ApolloClient/querys';
// Styles
import classes from '../styles/components/Comment.module.css';
// Types
import { CommentType } from '../types/Types';

type Props = {
    commentId: string
    author: string
    createdAt: string
    body: string
};

export default function Comment({ commentId, author, createdAt, body }: Props) {
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const { data, loading } = useQuery(GET_COMMENT_REPLIES, {
        variables: { commentId }
    });

    return (
        <>
            <li className={classes.comment}>
                <div className={classes.commentHeader}>
                    <p className={classes.title}>{author} SAYS:</p>
                    <p className={classes.meta}>{createdAt}</p>
                </div>
                <div className={classes.commentContent}>
                    <p>{body}</p>
                </div>
                <div className={classes.reply} onClick={() => setFormOpen(!formOpen)}>
                    <p>{formOpen ? "Cancel" : "Reply"}</p>
                </div>
            </li>
            {formOpen &&
                <form>
                    Form
                </form>
            }
            {!loading && data.getCommentReplies && data.getCommentReplies.length > 0 &&
                <ul className={classes.replies}>
                    {data.getCommentReplies.map((reply: CommentType) => (
                        <Comment
                            key={reply.id}
                            commentId={reply.id}
                            author={reply.author}
                            createdAt={reply.createdAt}
                            body={reply.body}
                        />
                    ))}
                </ul>
            }
        </>
    )
};