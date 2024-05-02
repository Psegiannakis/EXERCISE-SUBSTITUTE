export default function Body() {
  function setMuscleId(event: any) {
    // Retrieve the selected value from the event object
    const selectedMuscleId = event.target.value;
    // Use the selected value as needed
    console.log("Selected Muscle ID:", selectedMuscleId);
  }

  return (
    <>
      <div className="flex justify-center pt-10">
        <label htmlFor="muscle">SELECT MUSCLE GROUP</label>

        <select
          className="w-80"
          name="muscle"
          id="muscle"
          onChange={setMuscleId}
        >
          <option value="1">Biceps</option>
          <option value="2">Shoulders</option>
          <option value="4">Chest</option>
          <option value="5">Triceps</option>
          <option value="6">Abs</option>
          <option value="7">Calves</option>
          <option value="8">Glutes</option>
          <option value="10">Quads</option>
          <option value="11">Hamstrings</option>
          <option value="12">Lats</option>
        </select>
      </div>
    </>
  );
}
