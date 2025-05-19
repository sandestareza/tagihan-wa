import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/ui/card";

import "./App.css";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./components/ui/select";

import React, { useState } from "react";

const defaultForm = {
	namaSantri: "",
	noWa: "",
	jumlahTunggakan: "",
	bulanTunggakan: "",
	tanggalDitagihkan: "",
	tglTerakhirLunas: "",
};
function App() {
	const [form, setForm] = useState(defaultForm);

	const [message, setMessage] = useState("");

	const months = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

	const formatDateIndo = (dateString: string): string => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	};

	const getLastFiveDaysOfCurrentMonth = (): string[] => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth(); // 0-based

		const lastDay = new Date(year, month + 1, 0).getDate();

		const lastFiveDays: string[] = [];
		for (let i = 4; i >= 0; i--) {
			const date = new Date(year, month, lastDay - i);
			lastFiveDays.push(formatDateIndo(date.toString()));
		}

		return lastFiveDays;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleGenerate(form);
	};

	const handleGenerate = (form: {
		namaSantri: string;
		noWa: string;
		jumlahTunggakan: string;
		bulanTunggakan: string;
		tanggalDitagihkan: string;
		tglTerakhirLunas: string;
	}) => {
		setMessage(`Assalamu’alaikum Warahmatullahi Wabarakatuh\n\nYang kami hormati,\n*Wali Santri ${
			form.namaSantri
		}* yang dirahmati Allah Subhanahu wa Ta’ala.\n\nSemoga Bapak/Ibu senantiasa dalam keadaan sehat wal‘afiat serta selalu berada dalam lindungan dan keberkahan Allah Subhanahu wa Ta’ala.\n\nSehubungan dengan kelancaran proses pembelajaran di Rumah Tahfidz Azzam, bersama ini kami sampaikan informasi terkait administrasi pembayaran SPP.\nKami informasikan bahwa masih terdapat sisa pembayaran SPP bulan *${selectedMonths.join(
			", "
		)}* sebesar *${
			form.jumlahTunggakan
		}*,-*.\n\nPembayaran dapat mulai dilakukan pada tanggal *${formatDateIndo(
			form.tanggalDitagihkan
		)}*, dan kami mohon untuk dapat dilunasi paling lambat pada tanggal *${
			form.tglTerakhirLunas
		}*.\n\nPembayaran dapat dilakukan secara bertahap (diansur) agar tidak memberatkan Bapak/Ibu wali santri.\n\nKami ucapkan terima kasih atas perhatian dan kerja sama Bapak/Ibu sekalian.Semoga Allah Subhanahu wa Ta’ala senantiasa melimpahkan kelapangan rezeki serta keberkahan dalam setiap urusan. *Aamiin ya Rabbal ‘Aalamiin.*\n\nWassalamu’alaikum Warahmatullahi Wabarakatuh\n\nHormat kami,\n*Ketua Rumah Tahfidz Azzam*
          `);
	};

	const formatRupiah = (value: string): string => {
		// Hapus semua karakter selain angka
		const numberString = value.replace(/[^,\d]/g, "");

		const number = parseInt(numberString, 10);
		if (isNaN(number)) return "";

		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(number);
	};

	const handleKirim = () => {
		const encodedMessage = encodeURIComponent(message);
		window.open(
			`https://api.whatsapp.com/send?phone=${form.noWa}&text=${encodedMessage}`,
			"_blank"
		);
	};

	const lastFive = getLastFiveDaysOfCurrentMonth();

	return (
		<div className="flex min-h-screen items-center justify-center m-4">
			<Card className="w-[450px]">
				<CardHeader>
					<CardTitle>Tagihan Whatsapp</CardTitle>
					<CardDescription className="text-gray-500 text-xs">
						Form untuk mengirim ke Whatsapp wali santri yang
						memiliki Tagihan
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Nama santri</Label>
								<Input
									id="name"
									placeholder="Masukkan nama santri"
									autoComplete="off"
									name="namaSantri"
									value={form.namaSantri}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Nomor Whatsapp</Label>
								<Input
									id="name"
									placeholder="Masukkan nomor whatsapp"
									autoComplete="off"
									name="noWa"
									value={form.noWa}
									onChange={handleChange}
									onInput={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										const value = e.target.value;
										if (value.startsWith("0")) {
											e.target.value =
												62 + value.slice(1);
										}
										e.target.value = e.target.value.replace(
											/[^0-9]/g,
											""
										);
									}}
									maxLength={13}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework">
									Jumlah tunggakan
								</Label>
								<Input
									id="name"
									placeholder="Masukkan jumlah tunggakan"
									autoComplete="off"
									name="jumlahTunggakan"
									value={form.jumlahTunggakan}
									onChange={handleChange}
									onInput={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										const value = e.target.value;
										e.target.value = value.replace(
											/[^0-9]/g,
											""
										);
										e.target.value = formatRupiah(
											e.target.value
										);
									}}
									required
								/>
							</div>

							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework">
									Bulan Tunggakan
								</Label>
								<div className="grid grid-flow-col grid-rows-4">
									{months.map((month) => (
										<label
											key={month}
											className="flex items-center space-x-2"
										>
											<input
												type="checkbox"
												value={month}
												checked={selectedMonths.includes(
													month
												)}
												onChange={() =>
													setSelectedMonths((prev) =>
														prev.includes(month)
															? prev.filter(
																	(m) =>
																		m !==
																		month
															  )
															: [...prev, month]
													)
												}
											/>
											<span>{month}</span>
										</label>
									))}
								</div>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework">
									Tanggal ditagihkan
								</Label>
								<Input
									id="name"
									type="date"
									placeholder="Masukkan tanggal ditagihkan"
									name="tanggalDitagihkan"
									value={form.tanggalDitagihkan}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework">
									Tanggal terakhir lunas
								</Label>
								<Select
									required
									name="tglTerakhirLunas"
									onValueChange={(val) =>
										setForm({
											...form,
											tglTerakhirLunas: val,
										})
									}
									defaultValue={form.tglTerakhirLunas}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Pilih tanggal" />
									</SelectTrigger>
									<SelectContent className="bg-lime-100">
										{lastFive.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<Button
							type="submit"
							variant="outline"
							className="mt-5 w-full"
						>
							Generate
						</Button>
					</form>
				</CardContent>
				{message && (
					<CardFooter className="flex justify-between">
						<Card className="w-full">
							<CardHeader>
								<CardTitle>Preview</CardTitle>
								<CardDescription className="text-gray-500 text-xs">
									<p>
										Nama Santri :{" "}
										<span className="ml-2 font-semibold">
											{form.namaSantri}
										</span>
									</p>
									<p>
										No whatsapp :
										<span className="ml-2 font-semibold">
											{form.noWa}
										</span>
									</p>
								</CardDescription>
								<Button
									className="w-full"
									variant="outline"
									onClick={handleKirim}
								>
									Krim
								</Button>
							</CardHeader>
							<CardContent>
								<div className="flex w-full items-center gap-4">
									<pre className="mt-2 whitespace-pre-wrap break-all border border-gray-200 rounded-md bg-gray-100 text-xs p-2 text-left">
										{message}
									</pre>
								</div>
							</CardContent>
						</Card>
					</CardFooter>
				)}
			</Card>
		</div>
	);
}

export default App;
