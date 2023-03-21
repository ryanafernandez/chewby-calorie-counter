// function to format a timestamp as 'mm/dd/yyyy'
module.exports = (timestamp, long) => {

    const dateObj = new Date(timestamp);

    const formattedMonth = (dateObj.getMonth() + 1).toString().padStart(2, "0");

    const dayOfMonth = dateObj.getDate().toString().padStart(2, "0");

    const year = dateObj.getFullYear();

    return (long) ?
    `${formattedMonth}/${dayOfMonth}/${year}` : `${formattedMonth}/${dayOfMonth}`;
};
