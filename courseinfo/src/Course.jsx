const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {

    const initialValue = 0;
    const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, initialValue)

    return (
        <strong>total of {sum} exercises</strong>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
        <Part key={part.id} part={part} />
    )}   
  </>

const Course = ({course}) => {

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course