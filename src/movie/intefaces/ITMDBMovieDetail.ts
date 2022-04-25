import { IGenre } from "./IGenre";

export interface ITMDBMovieDetail {
    id:number,  
    title:  string,  
    overview:  string,            
    popularity:  number,         
    vote_average:  number,               
    vote_count:  number,              
    release_date: string,     
    genres: IGenre[]    
  }
  