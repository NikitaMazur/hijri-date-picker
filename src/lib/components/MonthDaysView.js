import React from 'react'
import cx from 'classnames'

class MonthDaysView extends React.Component {
  
  state = {
    englishDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  }
  
  getMonthStartDayName = () => {
    let time = this.props.currentTime
    time.startOf('iMonth')
    return time.format('dd') 
  }

  monthDays = () => {
    return this.props.currentTime.iDaysInMonth()
  }

  isSelectedDate = (i) => {
    let time = this.props.currentTime
    time.iDate(parseInt(i, 10))
    return this.props.selectedDate === time.format(this.props.dateFormat)
  }

  render(){
      let daysList = []
      for (let i = this.state.englishDayNames.indexOf(this.getMonthStartDayName()); i > 0; i--){
        daysList.push(
          <div key={daysList.length.toString()} className="month-days__item no-hover"></div>
        )
      }
      for (let i = 1; i < this.monthDays() + 1; i++) {
        daysList.push(
          <div className="month-days__item" selected={this.isSelectedDate(i)} key={daysList.length.toString()}>
            <button className={cx('month-days__btn', this.isSelectedDate(i) ? 'selected' : '')} onClick={this.props.setSelectedDate} value={i} type="button">{i}</button>
          </div>
        )
      }
      
      return <div className="month-days">
      {
        daysList
      }
    </div>;
  }
}

export default MonthDaysView