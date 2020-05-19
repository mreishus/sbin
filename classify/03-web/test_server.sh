#!/usr/bin/bash
echo ""
echo "Expect: Python"
curl -X POST -F 'text=for i in range(10):' http://localhost:8000/predict
echo ""
echo ""
echo "Expect: Elixir"
curl -X POST -F 'text=|> Enum.count()' http://localhost:8000/predict
echo ""
echo ""
echo "Expect: Javascript"
curl -X POST -F 'text=let myFilter = (b) => b.filter(x => x == 5)' http://localhost:8000/predict
