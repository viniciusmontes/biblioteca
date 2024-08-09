import Table from "../../components/Table";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="text-3xl font-bold underline">CRUD de livros</h1>
      <p>email : viniciusmontes@outlook.com.br</p>
      <span>Projeto Fullstack usando Java e Typescript</span>
      <div className="home-content">
        <Table />
      </div>
    </div>
  );
}
