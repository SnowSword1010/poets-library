import React from 'react';
import ReactDOM from 'react-dom';

function Heading() {
    return (
        <header className="heading">
            <h1 className = "heading-text">Poets Library</h1>
            <div className="svg-imgs-div">
                <svg class="icon svg-imgs">
                    <use xlinkHref="icons/Mycollection-SVG-sprite.svg#feather" />
                </svg>
            </div>
        </header>
    )
}

export default Heading;