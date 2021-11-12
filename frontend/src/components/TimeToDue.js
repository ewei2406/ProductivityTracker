const TimeToDue = ({ DueDate }) => {

    const currentDate = new Date()

    const dateDiff = Math.ceil((Date.parse(DueDate) - currentDate) / 86400000)

    let msg = `Due in ${dateDiff} days`

    let color = 'black'
    if (DueDate === '') {msg = 'No due date'}
    if (dateDiff === 0) {msg = 'Due Today'; color = 'orange'}
    else if (dateDiff === 1) { msg = 'Due Tomorrow'; color = '#FFCF20'}
    else if (dateDiff < 0) {msg = 'Overdue!'; color = 'red'}

    return(
        <span>
            <i className="fas fa-calendar" style={{ color: color }}></i> {msg}
        </span>
    )
}

export default TimeToDue