import React from "react";

import './post-list-item.css'

export default class PostListItem extends React.Component {


    render() {
        const {label,onDelete, onToggleImportant,onToggleLike,important,like} = this.props;
        let classNames = 'app-list-item d-flex justify-content-between';


        important ? classNames += ' important' : classNames += '';
        like ? classNames += ' like' : classNames += '';

        return (
            <li className={classNames}>
                <span onClick={onToggleLike} className="app-list-item-label">
                      {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn-star btn-sm" onClick={onToggleImportant}>
                        <i className="fa fa-star"/>
                    </button>
                    <button type="button" onClick={onDelete} className="btn-trash btn-sm">
                        <i className="fa fa-trash-o"/>
                    </button>
                    <i className="fa fa-heart"/>

                </div>
            </li>

        )
    }
}



