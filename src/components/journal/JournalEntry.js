import React from 'react';
import moment from 'moment';
import { activar} from '../actions/notes';
import { useDispatch } from 'react-redux';
import img from '../../assets/noImagen.png';

const JournalEntry =({id,date,title,body,url})=>{

    const notedate=moment(date);
    const dispatch=useDispatch();

    const handleEntryClick=()=>{
        dispatch(activar(id,{
            date,title,body,url
        })
    )};

    return(
        <div className="journal__entry pointer" onClick={handleEntryClick}>

        {
            url ?
            <div className="journal__entry-picture"
                style={{backgroundSize:'cover',
                        backgroundImage:`url(${url})`
                }}
            >
            </div>
            :

            <div className="journal__entry-picture"
                style={{backgroundSize:'cover',
                        backgroundImage:`url(${img})`
                }}
            >
            </div>

            
        }
            
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                   {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{notedate.format('dddd')}</span>
                <span>{notedate.format('Do')}</span>
            </div>

        </div>
    )
}

export default JournalEntry;