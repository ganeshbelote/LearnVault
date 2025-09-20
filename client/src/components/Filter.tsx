import Option from './Option'
import Select from './Select'

const Filter = () => {
  return (
    <div className='p-4 w-fit border-2 rounded-2xl flex justify-center flex-wrap gap-2'>
      <Select Title='Publication'>
        <Option value='nirali'>Nirali</Option>
        <Option value='vision'>Vision</Option>
      </Select>
      <Select Title='Level'>
        <Option value='ssc'>SSC</Option>
        <Option value='hsc'>HSC</Option>
        <Option value='undergraduate'>Undergraduate</Option>
        <Option value='postgraduate'>Postgraduate</Option>
      </Select>
      <Select Title='Course'>
        <Option value='bca'>BCA</Option>
        <Option value='bcs'>BSc Computer Science</Option>
      </Select>
      <Select Title='Semester'>
        <Option value='1'>I</Option>
        <Option value='2'>II</Option>
        <Option value='3'>III</Option>
        <Option value='4'>IV</Option>
        <Option value='5'>V</Option>
        <Option value='6'>VI</Option>
      </Select>
      <Select Title='Subject'>
        <Option value='os'>Operating System</Option>
        <Option value='dsa'>Data Structure & Algorithms</Option>
      </Select>
      <Select Title='Year'>
        <Option value='14-19'>2014-19</Option>
        <Option value='19-24'>2019-24</Option>
      </Select>
    </div>
  )
}

export default Filter
