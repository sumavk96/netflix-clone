
import React, {useEffect , useState } from 'react'
import YouTube from 'react-youtube';
import './RowPost.css';
import { API_KEY , imageUrl} from '../../../../constants/constants'
import axios from '../../../../axios'
import { action , originals } from '../../../../urls';

function RowPost(props) {
  const [Movies, setMovies]= useState([])
  const [urlId,setUrlId]=useState("")
  useEffect(() => { 
    
    axios.get(props.url).then((response)=>{
      console.log(response.data.results)
      setMovies(response.data.results)
      })
   
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      console.log(response.data)
      if(response.data.results.length!==0){
        setUrlId(response.data.results[1])
      }else{
        console.log('not available')
      }
    })
    }
  return (
    <div className='row'>
      <h1>{props.title}</h1>
      <div className='posters'>
       
      {Movies.map((obj)=>

          <img onClick={()=>handleMovie(obj.id)} className={ props.isSmall ? 'smallPoster':'poster'} src={`${Movies ? imageUrl + obj.backdrop_path : ""}`} alt="poster"/>

        )}
          
      </div>
      <YouTube videoId={urlId.key}opts={opts} /> 
      
    </div>
  )
}

export default RowPost
