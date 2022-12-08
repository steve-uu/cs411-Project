import React from "react";
const RestList = ({rest, title}) => {
    return ( 
        //Creating a list of the top recomended restaurants
        <div className="rest-list">
            <h2>{ title }</h2>
            {rest.map(rest => (
        <div className="rest-preview" key={rest.id} >
          <h2>{ rest.name }</h2>
          <p>Location: { rest.location }</p>
        </div>
      ))}
        </div>
     );
}
 
export default RestList;