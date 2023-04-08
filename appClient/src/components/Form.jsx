
export function Form({ handleOnSubmitAddTask, handleResetTasksServer }) {

    return (
        <>
            <button onClick={handleResetTasksServer}>Reset</button>

            <form onSubmit={handleOnSubmitAddTask} method="post">
                <label htmlFor="">Ingresa una nueva tarea</label>
                <input type="text" placeholder='Nombre de tarea' />
                <label htmlFor="">Fecha de realizacion</label>
                <input type="date" placeholder='Fecha de tarea' />
                {/* <textarea placeholder='Tarea desc opcional...' type="textarea" /> */}
                <button>Agregar</button>
            </form>
        </>
    )
}