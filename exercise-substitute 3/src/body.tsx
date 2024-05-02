import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Body() {
  const [selectedMuscleId, setSelectedMuscleId] = useState("");

  // Function to handle the change in muscle group selection
  const setMuscleId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Retrieve the selected value from the event object
    const muscleId = event.target.value;
    setSelectedMuscleId(muscleId);
  };

  const api = `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscleId}`;

  const muscleChosen = useQuery({
    queryKey: ["muscles", selectedMuscleId], // Include selectedMuscleId in the query key
    queryFn: () =>
      fetch(api, {
        headers: {
          "X-Api-Key":
            "KUc+q0X66WPn3c4NMr/31w==BdOHU969D6gAJHvC" /* change this so its private */,
        },
      }).then((res) => res.json()),
    enabled: selectedMuscleId !== "", // Enable the query only if a muscle is selected
  });

  // Use useEffect to refetch data whenever selectedMuscleId changes
  useEffect(() => {
    muscleChosen.refetch();
  }, [selectedMuscleId]);

  return (
    <>
      <div className="flex justify-center pt-10 bg-stone-900">
        <select
          className="w-60 bg-sky-800 rounded h-8 text-white text-center font-sans"
          name="muscle"
          id="muscle"
          onChange={setMuscleId}
          value={selectedMuscleId}
        >
          <option value="">SELECT MUSCLE GROUP</option>
          <option value="abdominals">abdominals</option>
          <option value="abductors">abductors</option>
          <option value="adductors">adductors</option>
          <option value="biceps">biceps</option>
          <option value="calves">calves</option>
          <option value="chest">chest</option>
          <option value="forearms">forearms</option>
          <option value="glutes">glutes</option>
          <option value="hamstrings">hamstrings</option>
          <option value="lats">lats</option>
          <option value="lower_back">lower_back</option>
          <option value="middle_back">middle_back</option>
          <option value="neck">neck</option>
          <option value="quadriceps">quadriceps</option>
          <option value="traps">traps</option>
          <option value="triceps">triceps</option>
        </select>
      </div>

      {selectedMuscleId && ( // Only render if selectedMuscleId is not empty
        <div className="flex flex-col align-middle items-center  pt-10 bg-stone-900 text-white">
          {/* Display the data fetched from the API */}
          {muscleChosen.isLoading && <p>Loading...</p>}
          {muscleChosen.isError && <p>Error fetching data</p>}
          {muscleChosen.isSuccess && (
            <>
              <h1 className="pb-4">EXERCISES FOR MUSCLE GROUP</h1>
              <ul className="">
                {muscleChosen.data.map((result: any) => (
                  <li className="list-disc" key={result.id}>
                    {result.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}
