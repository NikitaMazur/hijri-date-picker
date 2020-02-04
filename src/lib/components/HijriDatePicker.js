import React, { Component } from 'react'
import moment from 'moment-hijri'
import { Manager, Reference, Popper } from 'react-popper'
import onClickOutside from 'react-onclickoutside'
import DayNames from './DayNames.js'
import MonthList from './MonthsList'
import YearsList from './YearsList'
import MonthDaysView from './MonthDaysView'

class HijriDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.selectedDate || "",
      dateFormat: props.dateFormat || 'iYYYY/iMM/iDD',
      currentTime: moment(),
      calenderShown: false
    };
  }

  componentDidMount() {
    if (this.state.selectedDate) {
      this.setState({
        currentTime: moment(this.state.selectedDate, this.state.dateFormat),
      })
    }
  }
  componentDidUpdate(prevProps) {
    const { selectedDate: prevSelectedDate } = prevProps;
    const { selectedDate: nextSelectedDate } = this.props;
    if (prevSelectedDate !== nextSelectedDate) {
      this.setState({ ...this.state, selectedDate: nextSelectedDate })
    }
  }

  handleClickOutside = evt => {
    this.setState({
      calenderShown: false
    })
  }

  subtractMonth = () => {
    this.setState((prevState) => ({
      currentTime: prevState.currentTime.subtract(1, 'iMonth')
    }));
  }

  addMonth = () => {
    this.setState((prevState) => ({
      currentTime: prevState.currentTime.add(1, 'iMonth')
    }));
  }

  setSelectedDate = (event) => {
    let time = this.state.currentTime
    time.iDate(parseInt(event.target.value, 10))
    const selectedDate = time.format(this.state.dateFormat)
    this.setState({
      selectedDate,
      calenderShown: false
    })
    this.handleChange(selectedDate)
  }

  getMonthStartDayName = () => {
    let time = this.state.currentTime
    time.startOf('iMonth')
    return time.format('dd')
  }

  handleFocus = (event) => {
    const { onFocus = () => { } } = this.props
    onFocus(event.target.value)
    this.showCalender()
  }

  handleChange = (value) => {
    const { onChange = () => { } } = this.props
    onChange(value)
  }

  showCalender = () => {
    this.setState({
      calenderShown: true
    })
  }

  handelMonthChange = (value) => {
    let time = this.state.currentTime
    time.iMonth(parseInt(value.number, 10))
    this.setState({
      currentTime: time
    })
  }
  handelYearChange = (value) => {
    let time = this.state.currentTime
    time.iYear(parseInt(value.value, 10))
    this.setState({
      currentTime: time
    })
  }

  handelOnChange = (event) => {
    // 
  }

  renderYearAndMonthList() 
  {

  }

  render() {
    const { className, calendarClassName, wrapperClassName, name, placeholder, input, disabled } = this.props;
    return (
      <div className={wrapperClassName}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <input type="text" autoComplete="off" {...{ className, name, placeholder, disabled, ...input }} value={this.state.selectedDate} ref={ref} onFocus={this.handleFocus} readOnly />
            )}
          </Reference>
          {this.state.calenderShown &&
            <Popper
              placement="bottom"
              modifiers={{
                hide: { enabled: true},
                preventOverflow: { enabled: true, boundariesElement: 'viewport'}, 
              }}
            >
              {({ ref, style, placement, arrowProps }) => (
                <div className={calendarClassName}>
                  <div className="hijri-calendar" ref={ref} style={style} data-placement={placement}>
                    <div className="hijri-calendar__controls">
                      <div className="hijri-calendar__control-btn hijri-calendar__control-btn--prev" onClick={this.addMonth} type="button" >{'>'}</div>
                      <strong>{this.state.currentTime.format('iMMMM') + ' ('+this.state.currentTime.format('iMM')+') ' + this.state.currentTime.format('iYYYY')}</strong>
                      <div className="hijri-calendar__control-btn hijri-calendar__control-btn--next" onClick={this.subtractMonth} type="button" > {'<'} </div>
                      {
                        this.props.quickSelect &&
                        <div className="hijri-calendar__year-month-list">
                          <MonthList currentTime={this.state.currentTime} onChange={this.handelMonthChange} reactSelectProps={this.props.reactSelectProps} />
                          <YearsList currentTime={this.state.currentTime} onChange={this.handelYearChange} reactSelectProps={this.props.reactSelectProps} />
                        </div>
                      }
                      <DayNames />
                    </div>
                    <MonthDaysView currentTime={this.state.currentTime} dateFormat={this.state.dateFormat} selectedDate={this.state.selectedDate} setSelectedDate={this.setSelectedDate}/>
                    <div ref={arrowProps.ref} style={arrowProps.style} />
                  </div>
                </div>
              )}
            </Popper>
          }
        </Manager>
      </div>
    )
  }
}

export default onClickOutside(HijriDatePicker);
