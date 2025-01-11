import PropType from 'prop-types';

function Deck({Card, dataArr}){
    const cardArr = dataArr.map((data)=>{
        return (
            <li key={data.id}>
            <Card data={data}/>
            </li>
        );
    });

    return (<>
    <ul className='Deck'>
        {cardArr}
    </ul>
    </>)
}

Deck.propTypes={
    dataArr: PropType.array,
    Card: PropType.func,
}

export default Deck;