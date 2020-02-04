import React, { Component } from 'react'
import Select from 'react-select'

class MonthsList extends Component {
  state = {
    months: [
      {number: 0, name: 'محرم'},
      {number: 1, name: 'صفر'},
      {number: 2, name: 'ربيع 1'},
      {number: 3, name: 'ربيع 2'},
      {number: 4, name: 'جمادي 1'},
      {number: 5, name: 'جمادي 2'},
      {number: 6, name: 'رجب'},
      {number: 7, name: 'شعبان'},
      {number: 8, name: 'رمضان'},
      {number: 9, name: 'شوال'},
      {number: 10, name: 'ذو القعدة'},
      {number: 11, name: 'ذو الحجة'},
    ]
  }

  render() {
    return (
      <div>
        <Select
          onChange={this.props.onChange}
          value={this.state.months.find(i => this.props.currentTime.iMonth() === i.number)}
          getOptionLabel ={(option) => option.name}
          getOptionValue ={(option) => option.number}
          options={this.state.months}
          components={{ IndicatorSeparator: null }}
          {...this.props.reactSelectProps}
        />
      </div>
    )
  }
}

export default MonthsList