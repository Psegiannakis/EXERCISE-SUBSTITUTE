import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface Exercise {
  id: string;
  name: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

export default function Body() {
  const [selectedMuscleId, setSelectedMuscleId] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  // Function to handle the change in muscle group selection
  const setMuscleId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const muscleId = event.target.value;
    setSelectedMuscleId(muscleId);
    setSelectedExercise(null); // Reset selected exercise when muscle changes
  };

  const api = `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscleId}`;

  const muscleChosen = useQuery({
    queryKey: ["muscles", selectedMuscleId],
    queryFn: () =>
      fetch(api, {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY,
        },
      }).then((res) => res.json()),
    enabled: selectedMuscleId !== "",
  });

  function handleClick(result: Exercise) {
    setSelectedExercise(result);
  }

  useEffect(() => {
    if (selectedExercise) {
      scroll("instructions");
    }
  }, [selectedExercise]);

  const scroll = (className: string) => {
    const sections = document.getElementsByClassName(className);
    if (sections.length > 0) {
      sections[0].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className=" flex justify-center pt-10 bg-stone-900">
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
      {selectedMuscleId && (
        <div className="flex flex-col align-middle items-center pt-10 bg-stone-900 text-white">
          {muscleChosen.isLoading && (
            <div role="status">
              {" "}
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
          {muscleChosen.isError && <p>Error fetching data</p>}
          {muscleChosen.isSuccess && (
            <>
              <h1 className="pb-4">EXERCISES FOR MUSCLE GROUP</h1>
              <div className="grid grid-cols-5 grid-rows-2 w-11/12 min-h-[31rem] gap-5  ">
                {muscleChosen.data.map((result: Exercise) => (
                  <div
                    key={result.id}
                    className={`bg-slate-300 p-4 text-black relative rounded border-4 outline-1 hover:shadow-[1px_1px_7px_5px_#718096,-3px_3px_40px_5px_#7f9cf5] hover:shadow-cyan-900 hover:transition`}
                  >
                    <div className="">
                      <h2 className="font-bold text-center text-lg mb-3">
                        {result.name}
                      </h2>
                      <p className="">
                        <strong>Equipment:</strong> {result.equipment}
                      </p>
                      <p>
                        <strong>Difficulty:</strong> {result.difficulty}
                      </p>
                      <p className=" absolute bottom-4 m-4   text-black/65 p-1 rounded bg-slate-200 hover:bg-cyan-700 hover:text-white hover:scale-110 duration-300 text-center hover:cursor-pointer">
                        <strong onClick={() => handleClick(result)}>
                          Click for Instructions
                        </strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Display selected exercise data */}
      {selectedExercise && (
        <div className="relative flex flex-col align-middle items-center pt-10  bg-stone-900 text-white">
          <h1 className="py-8">SELECTED EXERCISE</h1>
          <div className=" min-h-80 bg-slate-300 p-4 text-black max-h-content">
            <h2 className="font-bold text-center text-lg mb-6">
              {selectedExercise.name}
            </h2>

            <p className="instructions">
              <strong>Instructions:</strong> {selectedExercise.instructions}
              <button
                onClick={() => scroll("select")}
                type="button"
                className="absolute bottom-0 right-0 m-4 bg-transparent/30 text-white bg-sky-800 hover:bg-sky-900 rounded-full p-2.5 hover:scale-110 hover:transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                  />
                </svg>
                <span className="sr-only">Icon description</span>
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
