// function to format a timestamp as 'mm/dd/yyyy'
module.exports = (timestamp) => {

    const dateObj = new Date(timestamp);

    const formattedMonth = (dateObj.getMonth() + 1).toString().padStart(2, "0");

    const dayOfMonth = dateObj.getDate().toString().padStart(2, "0");

    const year = dateObj.getFullYear();

    const formattedTimeStamp = `${formattedMonth}/${dayOfMonth}/${year}`;

    return formattedTimeStamp;
};
