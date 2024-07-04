import { useNavigate } from 'react-router-dom';

export default function Buy3() {
    const navigate = useNavigate();
    
    //模擬從資料庫拿取之訂單資料
    let order = [{ 品種: "虱目魚", 數量: "2", 價錢: "160" }, { 品種: "白蝦", 數量: "2", 價錢: "220" }]

    const tableStyle = {   //簡單css設定
        borderCollapse: 'collapse', // 设置相邻单元格的边框合并在一起
        width: '100%', // 设置表格宽度为100%
    };
    const cellStyle = {
        border: '1px solid black', // 设置每个单元格的边框为黑色，1像素宽
        padding: '8px', // 设置单元格内边距
    };

    const rightAlignedCellStyle = {
        ...cellStyle,
        textAlign: 'right', // 设置文本靠右对齐
    };

    const tableRows = order.map((item, index) => (
        <tr key={index}>
            <td style={cellStyle}>{item.品種}</td>
            <td style={cellStyle}>{item.數量}</td>
            <td style={cellStyle}>{item.價錢}</td>
        </tr>
    ));

    return (
        <>
            <div>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <td style={cellStyle} colSpan={3}>購物車</td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>品種</td>
                            <td style={cellStyle}>數量</td>
                            <td style={cellStyle}>價錢</td>
                        </tr>
                        {tableRows}
                        <tr>
                            <td style={cellStyle}></td>
                            <td style={rightAlignedCellStyle}>
                                <button onClick={handleNextPage}>返回購物車</button>
                            </td>
                            <td style={rightAlignedCellStyle}>
                                <button onClick={handleNextPage2}>確認</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    );

    function handleNextPage() {
        navigate(-1);
    }
    function handleNextPage2() {
        // navigate('');   不知道去哪裡
    }
}
