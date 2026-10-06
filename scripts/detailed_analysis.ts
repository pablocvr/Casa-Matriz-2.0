import { CATALOG_PART_1 } from '../src/data/catalogPart1';
import { CATALOG_PART_2 } from '../src/data/catalogPart2';

const existing = [...CATALOG_PART_1, ...CATALOG_PART_2];

function norm(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

const rawList = `Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Dermatology support	3 kgs		27731	1	5269	33000	18072	9659	18072
Drag Pharma	Calmedrag		14286	4	10857	68000	8390	23583	33560
Bola de Catnip			2101	1	399	2500	690	1411	690
Proplan gato	Kitten 1 kgs		9244	1	1756	11000	6523	2721	6523
Weight loss diabetes gato	1,5 kgs		23529	2	8941	56000	15206	16647	30412
Proplan gato	Urinary 7,5 kgs		45378	1	8622	54000	31571	13807	31571
Bandana kulcan			5042	1	958	6000	3353	1689	3353
Drag Pharma	Mebermic comp		1261	4	958	6000	640	2482	2560
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Fit Snack	Galletas carne 400 grs		3361	1	639	4000	2076	1285	2076
Bolsas para perros	Klint		2941	1	559	3500	2153	788	2153
Royal perro	Mini Adulto +8  3 kgs		22689	1	4311	27000	12561	10128	12561
Royal	Lata hipoalergenic		3913	2	1487	9312	2242	3341	4484
Proplan gato	Urinary 3 kgs		23529	1	4471	28000	16559	6970	16559
Royal	Lata renal perro		3529	1	671	4200	2387	1142	2387
Royal	Renal gato 2 kgs		22008	1	4182	26190	15962	6046	15962
Fit Snack	Galletas carne 400 grs		3361	2	1277	8000	2076	2571	4152
Fit Snack	Costillitas de cordero		8235	1	1565	9800	6068	2167	6068
Senior Neutered dog	3 kgs		26050	1	4950	31000	15206	10844	15206
Fit Snack	Conejo		11345	1	2155	13500	6068	5277	6068
Naturale	Ballica		3782	2	1437	9000	1660	4243	3320
Naturale	Ballica/topinambur		4622	2	1756	11000	2550	4144	5100
Timothy snack	Palitos de hierba timothy		3361	1	639	4000	1950	1411	1950
Timothy snack	Palitos de hierba de zanahoria		4202	2	1597	10000	2490	3423	4980
Weight loss & control dog	12 kgs		71429	1	13571	85000	45433	25996	45433
Weight loss diabetes gato	1,5 kgs		23529	1	4471	28000	15206	8323	15206
Weight loss & control dog	12 kgs		71429	1	13571	85000	45433	25996	45433
Senior Neutered dog	3 kgs		26050	1	4950	31000	15206	10844	15206
Royal	Urinary care 1,5 kgs		16387	1	3113	19500	11137	5250	11137
Pouch Leonardo	Drink Salmon		1092	1	208	1300	883	209	883
Royal	Lata gastrointestinal perro		3361	5	3193	20000	2387	4872	11935
Hueso Jamon Serrano	1 unidad		4202	3	2395	15000	2112	6269	6336
Proplan perro	Reduce calorias  raza mediana a grande12 kgs		47899	1	9101	57000	32296	15603	32296
Churu gato	Chicken with beef		2353	1	447	2800	1675	678	1675
Drag Pharma	Meloxivet sol		15966	1	3034	19000	11600	4366	11600
Catnip	raton catnip		2101	2	798	5000	890	2422	1780
Drag Pharma	Gastroenteril susp oral		12605	1	2395	15000	7580	5025	7580
Proplan perro	Reduce calorias  raza mediana a grande12 kgs		-47899	-1	-9101	-57000	-32296	-15603	-32296
Weight loss & control dog	12 kgs		71429	1	13571	85000	45433	25996	45433
Royal	Lata hipoalergenic		4034	1	766	4800	2242	1792	2242
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Canigest Combi	16 ml		10084	1	1916	12000	6550	3534	6550
Juguete cuerda algodón			4622	1	878	5500	1050	3572	1050
Simparica Trio	20 a 40 kgs		16387	1	3113	19500	10485	5902	10485
Doggo	Orejas de cerdo crispy		3782	1	718	4500	2500	1282	2500
Fit Snack	Tiritas de pollo		8235	1	1565	9800	6068	2167	6068
Hypoallergy gato	3 kgs		41176	1	7824	49000	26068	15108	26068
Naturale	Alfalfa		3668	4	2788	17460	1660	8032	6640
Timothy	Stick		2101	1	399	2500	1090	1011	1090
Natural dogs	Chicken		3193	2	1213	7600	2145	2097	4290
Doggo	Sazonador Vacuno & Ciervo		3782	1	718	4500	2882	900	2882
Fit Snack	Galletas carne 400 grs		3361	1	639	4000	2076	1285	2076
Royal perro	Hepatic 10,1		68908	2	26185	164000	48813	40189	97626
Previcox	227 mg		24370	1	4630	29000	16030	8340	16030
Previcox	57 mg		20168	1	3832	24000	10070	10098	10070
Royal	Lata gastrointestinal perro		3361	1	639	4000	2387	974	2387
Royal	Lata gastrointestinal perro		3361	8	5109	32000	2387	7795	19096
Fit Snack	Tiritas de pollo		8235	1	1565	9800	6068	2167	6068
Proplan Pouch	Gato Adulto pollo		1345	1	255	1600	927	418	927
Proplan Pouch	Gato adulto salmon		1345	9	2299	14400	980	3281	8820
Varilla	figuras		2941	1	559	3500	553	2388	553
Royal	Lata hipoalergenic		4034	2	1533	9600	2242	3583	4484
Rascadores	curvo diseño flores		4622	1	878	5500	1590	3032	1590
Kidney support perro	3 kgs		29412	1	5588	35000	18765	10647	18765
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Drag Pharma	Ursovet susp		9664	1	1836	11500	6312	3352	6312
Mazuri	Guinea pig		8403	1	1597	10000	6906	1497	6906
Litter	10lts		12605	1	2395	15000	9618	2987	9618
Naturale	Ballica		3782	1	718	4500	1660	2122	1660
Proplan gato	Urinary 1 kgs		10084	1	1916	12000	6523	3561	6523
Royal	Urinary care 1,5 kgs		16387	1	3113	19500	11137	5250	11137
Royal	Pouch Renal gato		2101	1	399	2500	1133	968	1133
Royal	Lata Recovery		3193	2	1213	7600	2195	1997	4390
Royal	Hypoallergenic gato 1,5 kgs		22269	1	4231	26500	12207	10062	12207
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Royal	Pouch Renal gato		2101	2	798	5000	1133	1936	2266
Royal	Lata Recovery		3193	3	1820	11400	2195	2995	6585
Royal pouch	Sensory Taste		2185	2	830	5200	1204	1962	2408
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Naturale	Alfalfa		3782	1	718	4500	1660	2122	1660
Naturale	Ballica		3782	1	718	4500	1660	2122	1660
Fit	Senior 20  kgs		38655	1	7345	46000	34444	4211	34444
Royal	Pouch Renal gato		2101	1	399	2500	1133	968	1133
Doggo	Orejas de cerdo crispy		3782	1	718	4500	2500	1282	2500
Proplan perro	Reduce calorias  raza mediana a grande12 kgs		47899	2	18202	114000	32296	31206	64592
Weight loss diabetes gato	1,5 kgs		23529	1	4471	28000	15206	8323	15206
Mazuri	hedgehog 500 grs		6303	1	1197	7500	4609	1694	4609
Corta uñas Mastergroomer	gato		5462	1	1038	6500	3289	2173	3289
Dissolution prevention cat	3 kgs		35294	1	6706	42000	21215	14079	21215
Collar isabelino	Perro 30 cms		10504	1	1996	12500	6890	3614	6890
Sabanilla FIT	60*60cms		4202	1	798	5000	2170	2032	2170
Royal perro	Puppy Mini 3 kgs		22689	1	4311	27000	14393	8296	14393
Royal	Indoor +7   1,5kgs		16807	1	3193	20000	10587	6220	10587
Naturale	Ballica		3782	4	2874	18000	1660	8486	6640
Mazuri	Rabbit 1 kg		11765	1	2235	14000	7475	4290	7475
Palitos	Topinambur		2353	1	447	2800	1533	820	1533
Timothy snack	Pastel de dientes de verduras y frutas		5882	1	1118	7000	3250	2632	3250
Fit	Adulto 20 kgs		42017	1	7983	50000	28762	13255	28762
Kidney support perro	12 kgs		73950	1	14050	88000	47791	26159	47791
Proplan perro	Puppy razas pequeñas 3 kgs		21008	1	3992	25000	13377	7631	13377
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Sabanilla FIT	90*60cms		13445	1	2555	16000	9100	4345	9100
Nexgard	Combo (gato)		13445	1	2555	16000	8250	5195	8250
Royal	Mini Adult 2,5 kgs		21008	1	3992	25000	13357	7651	13357
Fit Snack	Costillitas de cordero		8235	1	1565	9800	6068	2167	6068
Shampoo Traper	aloe vera		3361	1	639	4000	1950	1411	1950
Collar	S		2101	1	399	2500	474	1627	474
Drag Pharma	Invermic gotas perro		2101	1	399	2500	1379	722	1379
Uriclean	perro-gato		5882	1	1118	7000	4471	1411	4471
Natural dogs	Beef		3193	1	607	3800	2145	1048	2145
Rasqueta gatos	Mastergroomer		2941	1	559	3500	1687	1254	1687
Corbatin			2101	1	399	2500	590	1511	590
Royal gato	Castrado 4 kgs		28571	1	5429	34000	21090	7481	21090
Proplan Pouch	Gato Sterilized		1345	1	255	1600	1033	312	1033
Royal pouch	Sensory Taste		1748	1	332	2080	1204	544	1204
Royal pouch	Sensory Smell		2185	1	415	2600	1204	981	1204
Churu gato	Tuna Bonito		2353	1	447	2800	1264	1089	1264
Adult cat salmon	7 kg		56303	1	10697	67000	38223	18080	38223
Hypoallergy perro	12 kgs		83193	1	15807	99000	51858	31335	51858
Simparica	5 a 10 kgs		8824	2	3353	21000	4980	7687	9960
Ehliquantel			1261	2	479	3000	257	2007	514
Proplan gato	Adulto 7,5 kgs		41176	1	7824	49000	30019	11157	30019
Adult Cat	Neutered 7 kgs		56303	1	10697	67000	39055	17248	39055
Pala residuos	grande		1681	1	319	2000	490	1191	490
Comedero Lento			11765	1	2235	14000	3353	8412	3353
Hueso Jamon Serrano	1 unidad		4202	3	2395	15000	2112	6269	6336
Arenero gato XL con pala			16807	1	3193	20000	6500	10307	6500
Pouch Leonardo	Drink Salmon		1092	1	208	1300	883	209	883
Prebióticos	Skin & Hair perro		2101	1	399	2500	1386	715	1386
Mazuri	Turtle Aquatic		11345	2	4311	27000	6889	8911	13778
Mazuri	Turtle Aquatic		11345	2	4311	27000	6889	8911	13778
Latas Leonardo	Pescado 200 grs		2521	1	479	3000	1765	756	1765
Latas Leonardo	Pescado 400 grs		3697	2	1405	8800	2706	1983	5412
Proplan perro	Puppy raza mediana 1 kg		9244	1	1756	11000	1	9243	1
Royal	Urinary care 7,5 kgs		56303	1	10697	67000	42905	13398	42905
Pouch Leonardo	Drink Salmon		1092	1	208	1300	883	209	883
Pouch Leonardo	Drink ternera		1092	1	208	1300	883	209	883
Bola de Catnip			2101	1	399	2500	690	1411	690
Churu gato	Tuna with Clam		2353	1	447	2800	1575	778	1575
Churu gato	Tuna with Scallop		2185	1	415	2600	1106	1079	1106
Fit Snack	Tiritas de pollo		8235	1	1565	9800	6068	2167	6068
Kidney support perro	3 kgs		29412	1	5588	35000	18765	10647	18765
Drag Pharma	Mamistop perro 250 grs		10924	1	2076	13000	6978	3946	6978
Royal	Lata gastrointestinal perro		3361	2	1277	8000	2387	1949	4774
Royal	Lata hipoalergenic		4034	1	766	4800	2242	1792	2242
Drag Pharma	Mebermic comp		1261	1	240	1500	640	621	640
Bil Jac	Peanut Butter & banana flavor		3782	1	718	4500	2232	1550	2232
Bolsas para perros	Klint		2941	1	559	3500	2153	788	2153
Fit Snack	Espiral de Salmon		11345	1	2155	13500	6068	5277	6068
Churu gato	Chicken		2185	1	415	2600	1264	921	1264
Proplan gato	Urinary 1 kgs		10084	1	1916	12000	6523	3561	6523
Dissolution prevention cat	3 kgs		35294	1	6706	42000	22093	13201	22093
Pouch Leonardo	Drink ternera		1092	1	208	1300	883	209	883
Royal	Lata Recovery		3193	1	607	3800	2195	998	2195
Galletas Fit gato catnip	Crunchy Atún/salmón		3193	2	1213	7600	2042	2303	4084
Royal	Yorkshire 2,5 kgs		21008	1	3992	25000	14276	6732	14276
Latas Leonardo	Pato 400 grs		3697	1	703	4400	2412	1285	2412
Hueso Jamon Serrano	1 unidad		4202	1	798	5000	2112	2090	2112
Churu gato	Tuna with Scallop		2185	1	415	2600	1576	609	1576
Churu gato	Pop Tuna		2353	2	894	5600	1666	1374	3332
Bravecto	Perro 2 a 4,5 kgs		20168	1	3832	24000	14025	6143	14025
Torta para perros	250 grs		6303	1	1197	7500	3900	2403	3900
Proplan Pouch	Gato Sterilized		1345	7	1788	11200	1033	2181	7231
Proplan Pouch	Perro Adulto carne		1345	7	1788	11200	1006	2370	7042
Nexgard	Combo (gato)		13445	1	2555	16000	8250	5195	8250
Fit	Senior 20  kgs		38655	1	7345	46000	34444	4211	34444
Naturale	Ballica		3782	2	1437	9000	1660	4243	3320
Timothy	bowl L		4202	1	798	5000	2250	1952	2250
Weight loss diabetic perro	3kgs		28571	1	5429	34000	17425	11146	17425
Natural dogs	Beef		3193	1	607	3800	2145	1048	2145
Natural dogs	Chicken		3193	2	1213	7600	2145	2097	4290
Nexgard Spectra	7,6 a 15 kgs		10504	1	1996	12500	6725	3779	6725
Royal	Renal 10.1 Kg		67227	1	12773	80000	48813	18414	48813
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Proplan gato	Kitten 1 kgs		9244	1	1756	11000	6523	2721	6523
Churu gato	Chicken		2185	1	415	2600	1264	921	1264
Drag Pharma	Dermisolona susp oral		13445	1	2555	16000	8138	5307	8138
Drag Pharma	Silimadrag		15126	1	2874	18000	9509	5617	9509
Drag Pharma	Ursovet susp		9664	1	1836	11500	6312	3352	6312
Royal	Lata Recovery		3193	1	607	3800	2195	998	2195
Kong	Kitty		4622	1	878	5500	2730	1892	2730
Catnip	Hierba gatera		3782	1	718	4500	2554	1228	2554
Weight loss diabetes gato	1,5 kgs		23529	1	4471	28000	15206	8323	15206
Sabanilla FIT	90*60cms		13445	1	2555	16000	9100	4345	9100
Baby dog large-medium	3 kgs		25210	1	4790	30000	13067	12143	13067
Fit	Adulto raza pequeña		25210	1	4790	30000	15884	9326	15884
Proplan perro	Puppy razas medianas 3 kgs		20168	1	3832	24000	12936	7232	12936
Royal	Urinary care 1,5 kgs		16387	1	3113	19500	11137	5250	11137
Natural dogs	Chicken		3193	1	607	3800	2145	1048	2145
Bravecto	Gato Plus 2,8 a 6,25 kgs		26891	3	15328	96000	16615	30827	49845
Churu Juicy Bites	Chicken-tuna		2521	1	479	3000	1633	888	1633
Churu Juicy Bites	Shrimp-Seafood		2521	1	479	3000	1633	888	1633
Corta uñas Mastergroomer	gato		5462	1	1038	6500	3289	2173	3289
Drag Pharma	Naxpet susp		5882	1	1118	7000	4439	1443	4439
Drag Pharma	Superpet omega adulto		7143	1	1357	8500	4530	2613	4530
Doggo	Astas G		15546	1	2954	18500	10700	4846	10700
Dissolution prevention dog	12 kgs		69748	1	13252	83000	46820	22928	46820
Bil Jac	Chicken liver		3361	1	639	4000	1808	1553	1808
Sabanilla FIT	60*60cms		4202	1	798	5000	2170	2032	2170
Latas Leonardo	Conejo 200 grs		2521	1	479	3000	1765	756	1765
Latas Leonardo	Pato 200 grs		2521	1	479	3000	1765	756	1765
Latas Leonardo	Pescado 400 grs		3697	1	703	4400	2706	991	2706
Proplan Pouch	Gato adulto salmon		1345	2	511	3200	980	729	1960
Prebióticos	Skin  & Hair gato		2101	1	399	2500	1144	957	1144
Baby cat	1,5 kgs		20168	1	3832	24000	12387	7781	12387
Royal	Castrado 1,5 kgs		15966	1	3034	19000	10179	5787	10179
Naturale	Alfalfa		3782	1	718	4500	1660	2122	1660
Timothy	bowl M		3361	1	639	4000	1790	1571	1790
Senior dog	Neutered 12 kgs		61345	1	11655	73000	40581	20764	40581
Proplan Pouch	Perro Adulto carne		1345	2	511	3200	1006	677	2012
Royal	Renal gato 2 kgs		22689	1	4311	27000	15962	6727	15962
Proplan Pouch	Perro Adulto carne		1345	7	1788	11200	1006	2370	7042
Proplan Pouch	Gato Sterilized		1345	7	1788	11200	1033	2181	7231
Adulto dog small-toy	3 kgs		22689	1	4311	27000	15437	7252	15437
Naturale	Alfalfa		3782	1	718	4500	1660	2122	1660
Timothy	Shapes		2101	1	399	2500	980	1121	980
Royal	Renal gato 2 kgs		22689	1	4311	27000	15962	6727	15962
Nexgard Spectra	2  a 3.5 kgs		7983	1	1517	9500	5100	2883	5100
Royal	Urinary care 1,5 kgs		16387	1	3113	19500	11137	5250	11137
Royal	Renal gato 2 kgs		-22689	-1	-4311	-27000	-15962	-6727	-15962
Dermatology support	3 kgs		27731	1	5269	33000	18072	9659	18072
Mazuri	Guinea pig		8403	1	1597	10000	6906	1497	6906
Royal	Lata hipoalergenic		4034	1	766	4800	2242	1792	2242
Royal	Lata gastrointestinal perro		3361	3	1916	12000	2387	2923	7161
Lolopets	Mixs		3782	1	718	4500	1980	1802	1980
Fit	Adulto 20 kgs		42017	1	7983	50000	28762	13255	28762
Royal	Pouch Renal gato		2101	1	399	2500	1133	968	1133
Kidney & Joint	N°2 de 1,5 kg		28571	1	5429	34000	14791	13780	14791
Natural dogs	Chicken		3193	1	607	3800	2145	1048	2145
Hueso Jamon Serrano	1 unidad		4202	1	798	5000	2112	2090	2112
Drag Pharma	Invermic gotas gato		2101	1	399	2500	1660	441	1660
Royal perro	Mini Ageing +12  de 3 kgs		22689	1	4311	27000	17158	5531	17158
Royal	Indoor +7   1,5kgs		16807	1	3193	20000	10587	6220	10587
Royal	Indoor +7   1,5kgs		16807	1	3193	20000	10587	6220	10587
Royal perro	Mini Ageing +12  de 3 kgs		22689	1	4311	27000	17158	5531	17158
Naturale	Ballica		3782	2	1437	9000	1660	4243	3320
Proplan gato	Adulto +7		23529	1	4471	28000	16559	6970	16559
Royal	Indoor +7   1,5kgs		-16807	-1	-3193	-20000	-10587	-6220	-10587
Royal perro	Mini Ageing +12  de 3 kgs		-22689	-1	-4311	-27000	-17158	-5531	-17158
Drag Pharma	Invermic gotas perro		2101	1	399	2500	1379	722	1379
Proplan gato	Sterilized 3 kgs		23529	1	4471	28000	16559	6970	16559
Mazuri	Rabbit 2,5 kgs		20168	1	3832	24000	16421	3747	16421
Correa	wonder dog XL		6303	1	1197	7500	1790	4513	1790
Proplan gato	Sterilized 3 kgs		23529	1	4471	28000	16559	6970	16559
Fit	Senior 20  kgs		37496	1	7124	44620	34444	3052	34444
Prebióticos	Articular perro		1996	1	379	2375	1386	610	1386
Proplan gato	LiveClear 3kgs		29412	2	11176	70000	20528	17768	41056
Bedding	4lts		5042	1	958	6000	3209	1833	3209
Fit	Senior 20  kgs		38655	1	7345	46000	34444	4211	34444
Hueso Jamon Serrano	1 unidad		4202	1	798	5000	2112	2090	2112
Digestive Support dog	Dog 3kgs		29412	1	5588	35000	17795	11617	17795
Shampoo Traper	Neutro Puppy		3866	1	734	4600	2515	1351	2515
Proplan gato	Urinary 3 kgs		23529	1	4471	28000	16559	6970	16559
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Weight loss & control dog	12 kgs		71429	1	13571	85000	45433	25996	45433
Senior cat	3kgs		33613	1	6387	40000	19874	13739	19874
Royal	Castrado 1,5 kgs		15966	1	3034	19000	10179	5787	10179
Proplan Pouch	Perro Adulto carne		1345	6	1533	9600	1006	2031	6036
Adult cat salmon	1,5 kgs		20168	1	3831	24000	13034	7135	13034
Pouch Leonardo	Drink Pato		1092	1	208	1300	883	209	883
Proplan perro	Reduce calorias razas pequeñas 3 kgs		20168	1	3832	24000	14339	5829	14339
Proplan perro	Adulto raza grande 12 kgs		47059	1	8941	56000	32296	14763	32296
Galletas Fit gato catnip	Crunchy Atún/salmón		3193	3	1820	11400	2042	3454	6126
Churu pote			29412	1	5588	35000	21868	7544	21868
Uriclean	perro-gato		5882	1	1118	7000	4471	1411	4471
Mazuri	Rabbit 1 kg		11765	1	2235	14000	7475	4290	7475
Timothy	bolw S		2941	1	559	3500	1690	1251	1690
Timothy	Stick		2101	1	399	2500	1090	1011	1090
Timothy	bowl L		4202	1	798	5000	2250	1952	2250
Churu gato	Pop Chicken		2353	1	447	2800	1666	687	1666
Churu gato	Pop Tuna		2353	1	447	2800	1666	687	1666
Bandana kulcan			5042	1	958	6000	3353	1689	3353
Latas Belcando	Ternera con patatas y guisantes 800 grs		6723	2	2554	16000	4295	4856	8590
Latas Belcando	Pollo con pato y zanahoria 800 grs		6723	2	2555	16000	4295	4855	8590
Latas Belcando	Junior Ave y huevo 800		6723	2	2555	16000	4295	4855	8590
Royal	Indoor 1,5 kgs		16807	1	3193	20000	10179	6628	10179
Advantage	Pipeta hasta 4 kgs		6303	1	1197	7500	4194	2109	4194
Churu gato	Fun Bites chicken tuna		3782	1	719	4500	2400	1381	2400
Churu gato	Tuna with Crab		2353	1	447	2800	1576	777	1576
Fit Snack	Tiritas de pollo		8235	1	1565	9800	6068	2167	6068
Adult dog large-medium	12kgs		61345	1	11655	73000	41781	19564	41781
Filtros  dispensador de agua	6 unidades		7983	1	1517	9500	5874	2109	5874
Drag Pharma	Superpet omega senior		7143	1	1357	8500	4465	2678	4465
Nexgard Spectra	30,1 a 60 kgs		14706	1	2794	17500	9295	5411	9295
Fit Snack	Espiral de Salmon		11345	1	2155	13500	6068	5277	6068
Weight loss & control	1,5 kgs		22689	1	4311	27000	15114	7575	15114
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Bravecto	Gato Plus 2,8 a 6,25 kgs		26891	1	5109	32000	16615	10276	16615
Plato silicona	750 ml		7143	1	1357	8500	4111	3032	4111
Bandanas	L		4622	1	878	5500	1690	2932	1690
Proplan gato	Adulto 3 kgs		21849	1	4151	26000	15007	6842	15007
Proplan perro	Adulto raza pequeña 3kgs		21008	1	3992	25000	12936	8072	12936
Royal perro	Puppy Mini 3 kgs		22689	1	4311	27000	14393	8296	14393
Shampoo	Espuma seca perro		3782	1	718	4500	2055	1727	2055
Drag Pharma	Condrovet		20756	1	3944	24700	14116	6640	14116
Advantage	Pipeta hasta 4 kgs		6303	1	1197	7500	4194	2109	4194
Royal	Lata gastrointestinal perro		3361	2	1277	8000	2387	1949	4774
Royal	Lata hipoalergenic		4034	1	766	4800	2242	1792	2242
Proplan perro	Reduce calorias  raza mediana a grande12 kgs		47899	1	9102	57000	32296	15602	32296
Naturale	Ballica		3782	1	719	4500	1660	2121	1660
Naturale	Alfalfa		3782	1	718	4500	1660	2122	1660
Churu gato	Tuna with chicken		2185	1	415	2600	1390	795	1390
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Proplan gato	Urinary 3 kgs		23529	1	4470	28000	16559	6971	16559
Proplan perro	sensitive skin salmon 12 kgs		48739	1	9261	58000	33539	15200	33539
Adult dog large-medium	12kgs		61345	1	11655	73000	41781	19564	41781
Regepipel Plus			10924	1	2076	13000	6540	4384	6540
Toallas húmedas	Camon Talco		4202	1	798	5000	2969	1233	2969
Royal	Hypoalergenic 10,1 kgs		73950	1	14051	88000	55687	18262	55687
Mazuri	hedgehog 500 grs		6303	1	1197	7500	4609	1694	4609
Kong	Classic S		6723	1	1278	8000	4400	2322	4400
Doggo	Orejas de cerdo crispy		3782	1	718	4500	2500	1282	2500
Churu perro sachet	Chicken with tuna		2521	1	479	3000	1851	670	1851
Adult dog large-medium	12kgs		61345	1	11655	73000	41781	19564	41781
Royal	Indoor 1,5 kgs		16807	1	3193	20000	10179	6628	10179
Drag Pharma	Mebermic comp		1261	2	479	3000	640	1241	1280
Fit Snack	Costillitas de cordero		8235	1	1565	9800	6068	2167	6068
Naturale	Ballica		3782	1	718	4500	1660	2122	1660
Timothy snack	Palitos de hierba de zanahoria		4202	1	799	5000	2490	1711	2490
Churu gato	Fun Bites chicken tuna		3782	1	719	4500	2400	1381	2400
Churu gato	Tuna with Crab		2353	1	447	2800	1576	777	1576
Hueso Jamon Serrano	1 unidad		4202	2	1597	10000	2112	4179	4224
Adulto dog small-toy	7 kgs		46218	1	8781	55000	27408	18811	27408
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Revolution	0-2,5kgs		10924	1	2076	13000	6185	4739	6185
Fit	Adulto 20 kgs		42017	1	7983	50000	28762	13255	28762
Proplan perro	Adulto raza pequeña 3kgs		21008	1	3992	25000	12936	8072	12936
Mazuri	Guinea pig		8403	3	4790	30000	6906	4492	20718
Naturale	Ballica		3782	1	718	4500	1660	2122	1660
Matipet	crema 50 gr		10924	1	2075	13000	7110	3815	7110
Fit Snack	Galletas carne 400 grs		3361	1	639	4000	2076	1285	2076
Proplan Pouch	Perro Adulto carne		1345	4	1022	6400	1006	1354	4024
Proplan Pouch	Gato Sterilized		1345	4	1022	6400	1033	1246	4132
Collar isabelino	Perro 25 cms		8824	1	1676	10500	5725	3099	5725
Latas Belcando	Ternera con patatas y guisantes 800 grs		6723	2	2555	16000	4295	4855	8590
Latas Leonardo	Pescado 400 grs		3697	2	1405	8800	2706	1983	5412
Latas Leonardo	Pescado 200 grs		2521	2	958	6000	1765	1512	3530
Royal	Lata gastrointestinal perro		3361	1	639	4000	2387	974	2387
Sucravet	suspensión oral		19328	1	3672	23000	12159	7169	12159
Drag Pharma	Mamistop perro 250 grs		10924	1	2076	13000	6978	3946	6978
Drag Pharma	Invermic gotas perro		2101	1	399	2500	1379	722	1379
Galletas Fit gato catnip	Crunchy Atún/salmón		3193	3	1820	11400	2042	3454	6126
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Royal	Pouch Renal gato		2101	2	798	5000	1133	1936	2266
Churu gato	Tuna with Clam		2353	1	447	2800	1575	778	1575
Royal	Renal gato 2 kgs		22689	1	4311	27000	15962	6727	15962
Drag Pharma	Apeticat jarabe 100 ml		10084	1	1916	12000	6482	3602	6482
Royal	Lata renal perro		3529	2	1341	8400	2387	2285	4774
Proplan perro	Adulto raza mediana 12 kgs		47059	2	17882	112000	32296	29526	64592
Plato silicona	350ml		6303	1	1197	7500	3046	3257	3046
Collar	L		3782	1	718	4500	954	2828	954
Churu gato	Fun Bites chicken tuna		3782	1	719	4500	2400	1381	2400
Churu Juicy Bites	Chicken-tuna		2521	1	479	3000	1633	888	1633
Churu gato	Chicken with salmon		2353	1	447	2800	1675	678	1675
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Drag Pharma	Mebermic comp		1261	1	239	1500	640	621	640
Drag Pharma	Hasyun		7143	1	1357	8500	4732	2411	4732
Naturale	Ballica		3782	4	2874	18000	1660	8486	6640
Mazuri	Rabbit 1 kg		11765	1	2235	14000	7924	3841	7924
Advantage	Pipeta hasta 4 kgs		6303	2	2395	15000	4194	4217	8388
Fit	Adulto 20 kgs		42017	1	7983	50000	28762	13255	28762
Proplan Pouch	Perro Adulto carne		1345	2	511	3200	1006	677	2012
Baby dog small-toy	3kgs		25210	1	4790	30000	15206	10004	15206
Juguete	pelota madera y plumas		2101	1	399	2500	790	1311	790
Varilla	figuras		2941	1	559	3500	553	2388	553
Arnes gato			10084	1	1916	12000	5972	4112	5972
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Royal perro	Mini Ageing +12  de 3 kgs		22689	1	4311	27000	17158	5531	17158
Adult cat salmon	7 kg		56303	1	10697	67000	39564	16739	39564
Timothy	bowl L		4202	2	1597	10000	2250	3903	4500
Royal perro	Dachshund 7.5 kgs		47899	1	9101	57000	38585	9314	38585
Senior cat	3kgs		33613	1	6387	40000	19874	13739	19874
Senior cat	3kgs		33613	1	6387	40000	19874	13739	19874
Fit	Senior 20  kgs		38655	1	7345	46000	34444	4211	34444
Adult Neutered	Small and toy 3 kgs		24370	1	4630	29000	15344	9026	15344
Senior cat	3kgs		33613	1	6387	40000	19874	13739	19874
Fit Snack	Tiritas de pollo		8235	1	1565	9800	6068	2167	6068
Mazuri	Guinea pig		8403	1	1597	10000	6906	1497	6906
Naturale	Ballica		3782	1	718	4500	1660	2122	1660
Royal	Lata hipoalergenic		4034	2	1533	9600	2242	3583	4484
Fit	Adulto 20 kgs		42017	1	7983	50000	28762	13255	28762
Fit Snack	Galletas carne 400 grs		3361	1	639	4000	2076	1285	2076
Arena Sanitcat	7kgs		8403	1	1597	10000	6144	2259	6144
Weight loss & control dog	12 kgs		71429	1	13571	85000	45433	25996	45433
Senior Neutered dog	3 kgs		26050	1	4950	31000	15206	10844	15206
Uriclean	small animal		5882	1	1118	7000	3980	1902	3980
Timothy	bowl L		4202	1	798	5000	2250	1952	2250
Naturale	Ballica		3782	1	718	4500	1660	2122	1660
Hypoallergy perro	12 kgs		83193	1	15806	99000	53706	29488	53706
Hueso Jamon Serrano	1 unidad		4202	2	1597	10000	2112	4179	4224
Bola giratoria 3 más 1			3361	1	639	4000	1850	1511	1850
Latas Leonardo	Pato 400 grs		3697	1	703	4400	2412	1285	2412
Arena	de baño		5462	2	2076	13000	3969	2986	7938
Mazuri	Turtle Aquatic		11345	1	2155	13500	6889	4456	6889
Latas Belcando	Junior ave y huevos 400 grs		4622	1	878	5500	3059	1563	3059
Latas Belcando	Cordero 400		4622	1	878	5500	3059	1563	3059
Hueso Jamon Serrano	1 unidad		4202	1	798	5000	2112	2090	2112
Doggo	Astas G		15546	1	2955	18500	10700	4845	10700
Doggo	Orejas de cerdo crispy		3782	1	718	4500	2500	1282	2500
Doggo	Traquea de cerdo		4118	1	782	4900	3150	968	3150
Fit Snack	Tiritas de pollo		8235	1	1565	9800	6068	2167	6068
Proplan gato	Urinary 3 kgs		23529	1	4471	28000	16559	6970	16559
Proplan Pouch	Gato Adulto pollo		1345	1	255	1600	927	418	927
Adult Cat	Neutered 7 kgs		56303	1	10698	67000	39055	17247	39055
Adult cat salmon	7 kg		56303	1	10697	67000	39564	16739	39564
Pouch Leonardo	Drink ternera		1092	1	207	1300	883	210	883
Pouch Leonardo	Drink Salmon		1092	1	208	1300	883	209	883
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Bil Jac	Digestive support		3782	1	718	4500	2482	1300	2482
Fit	Adulto 20 kgs		42017	1	7984	50000	28762	13254	28762
Hypoallergy perro	12 kgs		83193	1	15807	99000	53706	29487	53706
Royal perro	Mini Ageing +12  de 3 kgs		22689	1	4311	27000	17158	5531	17158
Qchefs	Granulado perro		7983	1	1517	9500	5599	2384	5599
Arnes colores con luz	XL		25210	1	4790	30000	14450	10760	14450
Correa Kulcan	Reflectante		10924	1	2076	13000	3353	7571	3353
Drag Pharma	Apeticat jarabe 100 ml		10084	1	1916	12000	6482	3602	6482
Doggo	Orejas de cerdo crispy		3782	1	718	4500	2500	1282	2500
Royal	Mini Adult 7,5 kgs		43697	1	8303	52000	34572	9125	34572
Sofá básico colores			22689	1	4311	27000	11762	10927	11762
Comedero doble para gato			12605	1	2395	15000	6990	5615	6990
Filtros  dispensador de agua	6 unidades		7983	1	1517	9500	5874	2109	5874
Dispensador de agua	Celeste		29412	1	5588	35000	16790	12622	16790
Natural dogs	Chicken		3193	1	607	3800	2145	1048	2145
Fit Snack	Costillitas de cordero		8235	1	1564	9800	6068	2168	6068
Latas Leonardo	Conejo 400 grs		3697	1	703	4400	2706	991	2706
Weight loss diabetes gato	1,5 kgs		23529	1	4471	28000	15206	8323	15206
Proplan gato	Sterilized 7,5 kgs		45378	1	8622	54000	31571	13807	31571
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Royal	Urinary care 1,5 kgs		16387	1	3113	19500	11137	5250	11137
Churu gato	Tuna with Salmon		2185	1	415	2600	1264	921	1264
Churu gato	Tuna with Clam		2353	1	447	2800	1575	778	1575
Drag Pharma	Silimadrag		15126	1	2874	18000	9509	5617	9509
Apoquel	5.4 mg		35294	1	6706	42000	27530	7764	27530
Previcox	57 mg		20168	1	3832	24000	10955	9213	10955
Proplan perro	Adulto raza pequeña 3kgs		21008	1	3992	25000	12936	8072	12936
Proplan Pouch	Gato Sterilized		1345	1	255	1600	1033	312	1033
Royal pouch	Sensory Taste		1748	1	333	2080	1204	543	1204
Proplan gato	Urinary 3 kgs		23529	1	4471	28000	16559	6970	16559
Proplan Pouch	Gato Adulto pollo		1345	3	766	4800	927	1253	2781
Baby cat	3kgs		35294	1	6706	42000	20937	14357	20937
Galletas Fit gato catnip	Crunchy Atún/salmón		3193	3	1820	11400	2042	3454	6126
Latas Belcando	Pollo con pato y zanahoria 800 grs		6723	3	3832	24000	4295	7283	12885
Latas Belcando	Ternera con patatas y guisantes 800 grs		6723	2	2555	16000	4295	4855	8590
Latas Belcando	Junior Ave y huevo 800		6723	3	3832	24000	4295	7283	12885
Pouch Leonardo	Drink Salmon		1092	2	415	2600	883	419	1766
Pouch Leonardo	Drink Pato		1092	2	415	2600	883	419	1766
Pouch Leonardo	Drink ternera		1092	2	415	2600	883	419	1766
Proplan gato	Urinary 7,5 kgs		45378	2	17244	108000	31571	27614	63142
Weight loss & control dog	12 kgs		71429	1	13571	85000	45433	25996	45433
Dermatology support	3 kgs		27731	1	5269	33000	18072	9659	18072
Drag Pharma	Mebermic comp		1261	2	479	3000	640	1241	1280
Fit Snack	Galletas carne 400 grs		3361	2	1277	8000	2076	2571	4152
Adulto dog small-toy	7 kgs		46218	1	8782	55000	27408	18810	27408
Fit Snack	Costillitas de cordero		8235	1	1565	9800	6068	2167	6068
Doggo	Patas de pollo Crispy		3782	1	718	4500	2500	1282	2500
Royal	Yorkshire 2,5 kgs		21008	1	3992	25000	14276	6732	14276
Proplan Pouch	Gato Sterilized		1345	8	2043	12800	1033	2493	8264
Proplan Pouch	Perro Adulto carne		1345	8	2044	12800	1006	2708	8048
Uriclean	perro-gato		5882	1	1118	7000	4471	1411	4471
Dissolution prevention dog	12 kgs		69748	1	13252	83000	46820	22928	46820
Senior Neutered dog	3 kgs		26050	1	4950	31000	15206	10844	15206
Prebióticos	Articular perro		2101	1	399	2500	1386	715	1386
Churu gato	Tuna with Crab		2353	1	447	2800	1576	777	1576
Churu gato	Chicken with salmon		2353	1	447	2800	1675	678	1675
Fit Snack	Galletas carne 400 grs		3361	1	639	4000	2076	1285	2076
Proplan perro	Sensitive skin razas medianas y grandes 3 kgs		20168	1	3832	24000	13453	6715	13453
Latas Leonardo	Pescado 200 grs		2521	1	479	3000	1765	756	1765
Churu gato	Chicken with salmon		2353	1	447	2800	1675	678	1675
Royal	Hypoallergenic small dog 2 kgs		21849	1	4151	26000	14505	7344	14505
Proplan perro	sensitive skin salmon 12 kgs		48739	1	9261	58000	33539	15200	33539`;

interface RowItem {
  producto: string;
  variante: string;
  nombre: string;
  precioUnitarioNeto: number;
  precioBrutoUnitario: number;
  costoNetoUnitario: number;
}

const uniqueItems = new Map<string, RowItem>();

rawList.trim().split('\n').forEach(line => {
  const parts = line.split('\t');
  if (parts.length < 7) return;
  const prod = parts[0].trim();
  const variante = parts[1].trim();
  const pNeto = parseInt(parts[3] || '0', 10);
  const cant = parseInt(parts[4] || '1', 10);
  const subBruto = parseInt(parts[6] || '0', 10);
  const costoNeto = parseInt(parts[7] || '0', 10);
  
  if (!prod) return;
  // Calculate unit gross price
  const pBrutoUnit = cant !== 0 ? Math.round(Math.abs(subBruto) / Math.abs(cant)) : Math.round(Math.abs(pNeto) * 1.19);
  const nombre = variante ? `${prod} - ${variante}` : prod;
  const key = norm(nombre);

  if (!uniqueItems.has(key)) {
    uniqueItems.set(key, {
      producto: prod,
      variante,
      nombre,
      precioUnitarioNeto: Math.abs(pNeto),
      precioBrutoUnitario: pBrutoUnit,
      costoNetoUnitario: costoNeto
    });
  }
});

// Category detector
function detectCategory(item: RowItem): string {
  const text = (item.producto + ' ' + item.variante + ' ' + item.nombre).toLowerCase();
  if (text.includes('shampoo') || text.includes('arena') || text.includes('sabanilla') || text.includes('uriclean') || text.includes('litter') || text.includes('toallas') || text.includes('talco')) {
    return 'Higiene';
  }
  if (text.includes('drag pharma') || text.includes('bravecto') || text.includes('nexgard') || text.includes('simparica') || text.includes('previcox') || text.includes('apoquel') || text.includes('canigest') || text.includes('revolution') || text.includes('ehliquantel') || text.includes('matipet') || text.includes('sucravet') || text.includes('advantage') || text.includes('collar isabelino')) {
    return 'Salud';
  }
  if (text.includes('churu') || text.includes('snack') || text.includes('doggo') || text.includes('galletas') || text.includes('hueso') || text.includes('palitos') || text.includes('torta') || text.includes('prebioticos') || text.includes('catnip') || text.includes('timothy') || text.includes('naturale') || text.includes('qchefs') || text.includes('bil jac') || text.includes('natural dogs')) {
    return 'Snack / Heno';
  }
  if (text.includes('plato') || text.includes('correa') || text.includes('arnes') || text.includes('bandana') || text.includes('juguete') || text.includes('pelota') || text.includes('rascador') || text.includes('corta u') || text.includes('varilla') || text.includes('bolsas') || text.includes('arenero') || text.includes('comedero') || text.includes('dispensador') || text.includes('sofa') || text.includes('filtros')) {
    return 'Accesorios';
  }
  // Default food
  return 'Alimentos';
}

const missingAlimentos: RowItem[] = [];
const missingOtros: RowItem[] = [];
const present: { item: RowItem; matchedExisting: any }[] = [];

for (const [key, item] of uniqueItems.entries()) {
  const match = existing.find(ex => {
    const exN = norm(ex.nombre);
    const exComb = norm(ex.variante ? `${ex.producto}${ex.variante}` : ex.producto);
    const itemComb = norm(item.producto + item.variante);
    return exN === key || exComb === itemComb || exComb === key || exN === itemComb;
  });

  if (match) {
    present.push({ item, matchedExisting: match });
  } else {
    const cat = detectCategory(item);
    if (cat === 'Alimentos') {
      missingAlimentos.push(item);
    } else {
      missingOtros.push(item);
    }
  }
}

console.log(JSON.stringify({
  totalEnviados: uniqueItems.size,
  totalPresentes: present.length,
  totalFaltantesAlimentos: missingAlimentos.length,
  totalFaltantesOtros: missingOtros.length,
  missingAlimentos,
  missingOtros
}, null, 2));
