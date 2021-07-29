import React from 'react';

const PopoverwrapLogic = () => {
  const chercheData = async (url) => {

    const response = await fetch(url);
    const responseData = await response.json();
    console.log(response)
    console.log(responseData)
    console.log(url)

    if (response.ok) {
      console.log("ok");
      return responseData

    } else {
      alert(JSON.stringify(responseData))
      return false
    }

  }

  const handlePopoverOpen = (event,region) => {
    if (!open){
      setAnchorEl({a:event.domEvent.currentTarget,b:event.domEvent.pageX,c:event.domEvent.pageY,d:"rr"});
    }
  };

  const handlePopoverClose = () => {
    if (open){
      setAnchorEl({a:null,b:null,c:0,d:""});
    }
  };

}
  export default PopoverwrapLogic;