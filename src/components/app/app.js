import React from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React', important: false, like: false},
                {label: 'That is so good', important: false, like: false},
                {label: 'I need a break...', important: false, like: false}
            ],
            term: '',
            filter:'all'
        };
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLike = this.onToggleLike.bind(this)
        this.filterPost = this.filterPost.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
    }

    deleteItem(id) {
        this.setState(({data}) => {

            const newArr = [...data.slice(0, id), ...data.slice(id + 1)];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,

        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]

            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const old = data[id];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, id), newItem, ...data.slice(id + 1)]

            return {
                data: newArr
            }
        })
    }

    onToggleLike(id) {
        this.setState(({data}) => {
            const old = data[id];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, id), newItem, ...data.slice(id + 1)]

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term) > -1;
        })
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items;
        }

    }

    onUpdateSearch(term) {
        this.setState({term})
    }
    onFilterSelect(filter){
        this.setState({filter})

    }

    render() {
        const {data, term, filter} = this.state
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter)
        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList onDelete={this.deleteItem}
                          posts={visiblePosts}
                          onToggleImportant={this.onToggleImportant}
                          onToggleLike={this.onToggleLike}
                />
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }

}

