class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const animaisPermitidos = {
            LEAO: { tamanho: 3, bioma: ["savana"] },
            LEOPARDO: { tamanho: 2, bioma: ["savana"] },
            CROCODILO: { tamanho: 3, bioma: ["rio"] },
            MACACO: { tamanho: 1, bioma: ["savana", "floresta"] },
            GAZELA: { tamanho: 2, bioma: ["savana"] },
            HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"] }
        };

        const recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animaisExistentes: ["MACACO", "MACACO", "MACACO"] },
            { numero: 2, bioma: "floresta", tamanho: 5, animaisExistentes: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animaisExistentes: ["GAZELA"] },
            { numero: 4, bioma: "rio", tamanho: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animaisExistentes: ["LEAO"] }
        ];

        if (!animaisPermitidos[animal]) {
            return { erro: "Animal inválido" };
        }

        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animalInfo = animaisPermitidos[animal];
        const biomasPermitidos = animalInfo.bioma;
        const espacoOcupado = animalInfo.tamanho * quantidade;

        const recintosViaveis = [];
        const carnivoros = ["LEAO", "LEOPARDO"];
        const isCarnivoro = carnivoros.includes(animal);

        recintos.forEach(recinto => {
            if (biomasPermitidos.includes(recinto.bioma)) {
                let espacoUsado = recinto.animaisExistentes.reduce((total, existente) => {
                    return total + animaisPermitidos[existente].tamanho;
                }, 0);

                const especiesExistentes = new Set(recinto.animaisExistentes);
                const temMaisDeUmaEspecie = especiesExistentes.size > 1;

                if (temMaisDeUmaEspecie) {
                    espacoUsado += 1;
                }

                const espacoDisponivel = recinto.tamanho - espacoUsado;

                if (animal === "MACACO" && quantidade > 1 && recinto.animaisExistentes.length === 0) {
                    return;
                }

                if (isCarnivoro) {
                    const outrasEspecies = recinto.animaisExistentes.filter(a => a !== animal);
                    if (outrasEspecies.length > 0) {
                        return;
                    }
                }

                if (animal === "HIPOPOTAMO" && !["savana", "rio"].includes(recinto.bioma) && especiesExistentes.size > 0) {
                    return;
                }

                if (espacoDisponivel >= espacoOcupado) {
                    recintosViaveis.push({
                        numero: recinto.numero,
                        espacoLivre: espacoDisponivel - espacoOcupado,
                        espacoTotal: recinto.tamanho
                    });
                }
            }
        });

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        if (recintosViaveis.length > 0) {
            return {
                recintosViaveis: recintosViaveis.map(
                    r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`
                )
            };
        }

        return { erro: "Não há recinto viável" };
    }
}

export { RecintosZoo };
