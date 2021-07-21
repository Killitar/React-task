import React from "react";
import PostListItem from '../post-list-item';
import "./post-list.css"

const PostList = ({posts,onDelete, onToggleImportant,onToggleLike}) => {
    const elements = posts.map((item,index) => {

        return (
            <div key={index} className={'list-group-item'}>
                <PostListItem
                    label={item.label}
                    important={item.important}
                    like={item.like}
                    onDelete={()=>onDelete(index)}
                    onToggleImportant={()=>onToggleImportant(index)}
                    onToggleLike={()=>onToggleLike(index)}
                />
            </div>
        )
    })
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;