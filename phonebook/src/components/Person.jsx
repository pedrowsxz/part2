const Person = ({name, number, handleDeleteButton}) => {
    return (
      <>
      <p>
        {name} {number}
        <button onClick={handleDeleteButton}>delete</button>
      </p>
      </>
    )
  }

export default Person