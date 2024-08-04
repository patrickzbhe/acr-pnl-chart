import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function PokerHands({ data }) {
    const [heroName, setHeroName] = useState('');
    const [profitLoss, setProfitLoss] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const parseData = () => {
            const lines = data.split('\n');
            let currentHero = '';
            let currentHandProfitLoss = 0;
            const hands = [];
            const handLabels = [];
            lines.forEach(line => {
                if (line.includes('Dealt to')) {
                    currentHero = line.split(' ')[2];
                    if (!heroName) setHeroName(currentHero);
                }
            });

            lines.forEach(line => {
                let is_hero = line.includes(heroName);
                if (is_hero && line.includes('posts the big blind')) {
                    currentHandProfitLoss -= parseFloat(line.split('$')[1]);
                }
                if (is_hero && line.includes('calls')) {
                    currentHandProfitLoss -= parseFloat(line.split('$')[1]);
                }
                if (is_hero && line.includes('bets')) {
                    currentHandProfitLoss -= parseFloat(line.split('$')[1]);
                }
                if (line.includes('won')) {
                    let win_amount = parseFloat(line.split('$')[1]);
                    if (line.includes(heroName)) {
                        currentHandProfitLoss += win_amount;
                    }
                    hands.push(currentHandProfitLoss);
                    handLabels.push(`Hand #${hands.length}`);
                }
            });

            setProfitLoss(hands);
            setLabels(handLabels);
        };

        parseData();
    }, [data, heroName]);

    return (
        <div style={{ width: '100vw', height: '60vh' }}>
            <h1>PnL - Hero: {heroName}</h1>
            <Line
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Profit/Loss',
                            data: profitLoss,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }
                    ]
                }}
            />
        </div>
    );
}

export default PokerHands;