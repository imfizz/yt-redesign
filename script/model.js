class YoutubeRedesign { 
    async getLatestVideo(userInput){
         
        const myapi = 'AIzaSyDQsq-3kJ1ZF43YZhAbdSPdY3RXzX6QiuU';
        
        const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&key=${myapi}&maxResults=15`);
        
        const videoName = await videoResponse.json();
        return videoName;
    }
}



class UI {
    constructor(){ 
        this.result = document.querySelector("#banner"); 
        this.input = document.querySelector("#search"); 
        this.channelTitle = document.querySelector("#channelTitle");
        this.videoDescription = document.querySelector("#description-content");
        this.youtubeProfilePicture = document.querySelector("#youtube-profile");
    }

    showResult(userInput){
        
        this.result.innerHTML = `<iframe width="565" height="319" src="https://www.youtube.com/embed/${userInput.items[0].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           `;

        this.channelTitle.innerHTML = `${userInput.items[0].snippet.channelTitle}`;
        this.videoDescription.innerHTML = `${userInput.items[0].snippet.description}`.substr(0, 150) + " ...";
        this.youtubeProfilePicture.setAttribute("src", `${userInput.items[0].snippet.thumbnails.high.url}`);

        userInput.items.forEach(function(item, i){
            
            const otherVideos = document.querySelector("#other-videos");
            var videoContainer = document.createElement("div");
            
            videoContainer.setAttribute("id", "video-container"+ `${i}`);

            videoContainer.setAttribute("class", "video-container");

            videoContainer.setAttribute("data-key", `${userInput.items[i].id.videoId}`);

            videoContainer.setAttribute("data-channelTitle", `${userInput.items[i].snippet.channelTitle}`);

            videoContainer.setAttribute("data-description", `${userInput.items[i].snippet.description}`.substr(0, 150) + " ...");
            
            videoContainer.setAttribute("data-image", `${userInput.items[i].snippet.thumbnails.high.url}`);
            
            videoContainer.setAttribute("onclick", "callme(this.getAttribute('data-key'), this.getAttribute('data-channelTitle'), this.getAttribute('data-description'), this.getAttribute('data-image'));");
            videoContainer.innerHTML = `<img class="img" id="other-video-img${i}" src="${userInput.items[i].snippet.thumbnails.default.url}"/><p class="video-title" id="other-video-title${i}">${userInput.items[i].snippet.title.substr(0,36)}</p>`;

            otherVideos.appendChild(videoContainer);
            

        });



    }

    clearBanner(){
        this.result.innerHTML = ''; 
    }

    
    
    clearFields(){
        this.input.value = '';
    }
}

export {YoutubeRedesign, UI}
