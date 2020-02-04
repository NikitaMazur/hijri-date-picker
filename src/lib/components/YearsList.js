// Hijri year (1356 to 1500)
import React, { Component } from 'react'
import Select from 'react-select'

class YearsList extends Component {
  
  state = {
      minYear: 1356,
      maxYear: 1500
  }

  render() {
    let yearsList = []
    // Generate a select options of all supported years
    for(let i = this.state.minYear; i <= this.state.maxYear; i = i + 1){
      yearsList.push(i)
    }
    yearsList = yearsList.map(i => ({ label: i, value: i }))
    return (
      <div>
        <Select
          onChange={this.props.onChange}
          value={yearsList.find(i => this.props.currentTime.iYear() === i.value)}
          options={yearsList}
          components={{ IndicatorSeparator: null }}
          {...this.props.reactSelectProps}
        />
      </div>
    )
  }
}

export default YearsList