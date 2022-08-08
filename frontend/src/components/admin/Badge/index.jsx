import badge from "../../../assets/admin/badge.svg";

const Index = () => {
  return (
    <div className="flex justify-between items-center gap-8 w-full">
      <div className="card custome-shadow-sm flex justify-between p-0 w-full">
        <div className="flex flex-col justify-between p-3">
          <div>
            <h3 className="text-xl mb-1">Congratulations 🎉</h3>
            <p>You have won gold medal</p>
          </div>
          <button className="btn btn-primary mt-5">View</button>
        </div>
        <div>
          <img src={badge} alt="badge" className="pb-2 pr-2 w-20" />
        </div>
      </div>
      <div className="card custome-shadow-sm flex justify-between p-0 w-full">
        <div className="flex flex-col justify-between p-3">
          <div>
            <h3 className="text-xl mb-1">Congratulations 🎉 </h3>
            <p>You have won gold medal</p>
          </div>
          <button className="btn btn-primary mt-5">View</button>
        </div>
        <div>
          <img src={badge} alt="badge" className="pb-2 pr-2 w-20" />
        </div>
      </div>
    </div>
  );
};

export default Index;
