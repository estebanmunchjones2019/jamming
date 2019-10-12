import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                <ol>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                </ol>
            </div>
        );
    }
};


