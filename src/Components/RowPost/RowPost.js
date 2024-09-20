import React,{useEffect,useState} from 'react'
import './RowPost.css'
import { API_KEY, imageUrl } from "../../constants/constants";
import axios from '../../axios'
import Youtube from "react-youtube";

function RowPost(props) {

    const [movies,setMovies]=useState([])
    const [urlId,setUrlId]=useState('')

    useEffect(()=>{
        axios.get(props.url).then((response)=>{
            console.log(response.data)
            setMovies(response.data.results)
        }).catch(e=>{
            console.log('error occured')
        })
    },[])

    const opts={
        height:'390',
        width: '100%',
        playerVars:{
            autoplay:1,
        },
    };

    const handleMovie=(id)=>{
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
            console.log(response.data)
            if(response.data.results.length!==0)
            {
                setUrlId(response.data.results[0].key)
            }
            else{
                console.log('Empty array');
                
            }
        }).catch(e=>{
            console.log('error occured')
        })
    }

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {
                    movies.map((obj,index)=>{
                        return(
                            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} key={index} alt='poster' src={`${imageUrl+obj.backdrop_path}`} />
                        )
                    })
                }
            </div>
            { urlId && <Youtube opts={opts} videoId={urlId} />}
            {/* above Youtube is a module installed for viewing youtube videos without using iframes */}
        </div>
    )
}

export default RowPost