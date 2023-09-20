

const Clock = () => {
    return (
        <h3 className="heading">
            <span>{new Date().toLocaleTimeString()}</span>
        </h3>
    );
};

export default Clock;
