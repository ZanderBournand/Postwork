export const getTimeSincePost = (timestamp) => {

    let storedDate =  new Date(timestamp.seconds * 1000)
    let nowDate = new Date()
    let diff = (nowDate.getTime() - storedDate.getTime())

    var seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours   = Math.floor(minutes / 60),
    days    = Math.floor(hours / 24),
    weeks   = Math.floor(days / 7),
    months  = Math.floor(days / 30),
    years   = Math.floor(days / 365);

    if (years > 1) {
        return years + " years ago" 
    }
    else if (years > 0) {
        return years + " year ago" 
    }
    else if (months > 1) {
        return months + " months ago" 
    }
    else if (months > 0) {
        return months + " month ago" 
    }
    else if (weeks > 1) {
        return weeks + " weeks ago" 
    }
    else if (weeks > 0) {
        return weeks + " week ago" 
    }
    else if (days > 1) {
        return days + " days ago" 
    }
    else if (days > 0) {
        return days + " day ago" 
    }
    else if (hours > 1) {
        return hours + "h ago" 
    }
    else if (hours > 0) {
        return hours + "h ago" 
    }
    else if (minutes > 1) {
        return minutes + " mins ago" 
    }
    else if (minutes > 0) {
        return minutes + "min ago" 
    }
    else {
        return "< 1min ago"
    }

}

export const getHotValue = (score, date) => {

    const dateToUse = (date == null) ? new Date() : date

    var order = log10(Math.max(Math.abs(score), 1));
    var sign = score>0 ? 1 : score<0 ? -1 : 0;
    var seconds = epochSeconds(dateToUse) - 1134028003;
    var product = order + sign * seconds / 45000;
    return Math.round(product*10000000)/10000000;
}

function log10(val){
    return Math.log(val) / Math.LN10;
}
function epochSeconds(d){
      return (d.getTime() - new Date(1970,1,1).getTime())/1000;
}

export const getPostsStats = (posts) => {

    let comments = 0;
    let votes = 0;

    posts.forEach((post) => {
        comments += post?.data.commentsCount
        votes += post?.data.votesCount
    })

    return [comments, votes]


}