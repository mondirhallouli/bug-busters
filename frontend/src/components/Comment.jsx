export default function Comment() {
    return (
        <section className="p-5 mb-5 border rounded-md bg-white shadow-md">
            <div className="flex justify-start items-center gap-4 mb-3">
                <p className="font-openSans text-darkblue italic text-base">Username</p>
                <p className="font-openSans text-sm text-zinc-400">a few seconds ago</p>
            </div>
            <p className="font-openSans text-sm text-darkgray italic">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, molestias culpa! Inventore vitae, maxime fugit illum odio ea voluptate suscipit!</p>
        </section>
    );
}